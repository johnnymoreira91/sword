
declare namespace Express {
  export interface Request {
      permission: number;
      userId: string;
  }
  export interface Response {
    time: number
}
}
