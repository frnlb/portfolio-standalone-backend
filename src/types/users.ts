export type Rights = "admin" | "reader" | "user";

export interface User {
  user_id: string;
  username: string;
  email: string;
  rights: Rights;
}
