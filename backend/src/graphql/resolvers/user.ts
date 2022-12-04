import { ICreateUsernameResponse, IGraphQLContext } from "../../utils/types";
import { ApolloError } from "apollo-server-core";
import { User } from "@prisma/client";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: IGraphQLContext
    ): Promise<Array<User>> => {
      const { username: searchedUsername } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        throw new ApolloError("You are not logged in");
      }
      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              mode: "insensitive",
              not: myUsername,
            },
          },
        });
        return users;
      } catch (error: any) {
        console.log("searchUsers error:", error);
        throw new ApolloError(error?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: IGraphQLContext
    ): Promise<ICreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "You must be logged in to do this.",
        };
      }

      const { id: userId } = session.user;

      try {
        // Check if username is already taken
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (existingUser) {
          return {
            error: "Username is already taken.",
          };
        }
        //Update username
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("createUsername error: ", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
