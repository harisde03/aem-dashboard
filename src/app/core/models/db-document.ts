export interface DbDocument {
  _id: string;
  _rev?: string;
  [key: string]: any;
}
