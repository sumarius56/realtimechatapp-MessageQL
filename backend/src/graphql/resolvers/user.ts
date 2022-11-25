import { ICreateUsernameResponse, IGraphQLContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
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
