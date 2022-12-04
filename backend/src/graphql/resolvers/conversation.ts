import { IGraphQLContext } from "../../utils/types";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantsId: Array<string>; context: IGraphQLContext }
    ) => {
      console.log("Inside createConversation", args);
    },
  },
};

export default resolvers;
