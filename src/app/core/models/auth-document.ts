import { DbDocument } from './db-document';

export interface AuthDocument extends DbDocument {
  username: string;
  password: string;
  token: string;
  lastLogin: string | null;
}
