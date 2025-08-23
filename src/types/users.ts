export type Rights = "admin" | "reader" | "user";

export interface User {
  user_id?: number;
  username: string;
  email: string;
  rights: Rights;
}
