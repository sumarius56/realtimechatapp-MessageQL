import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

export interface IGraphQLContext {
  session: ISession | null;
  prisma: PrismaClient;
}

export interface ISession {
  user: IUser;
  expires: ISODateString;
}

// User
export interface ICreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
}
