import { Id } from "@/convex/_generated/dataModel";

export interface User {
  name: string,
  email: string,
  picture?: string,
  subscriptionId?: string,
  credits: number,
  height?: number,
  weight?: number,
  gender?: string,
  goal?: string,
  calories?: number
  proteins?: number
  _id?: Id<"users">
}