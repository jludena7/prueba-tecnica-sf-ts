import { ResultSetHeader } from "mysql2/promise";

export interface IDatabase {
  connect(): Promise<void>;

  insert(sql: string, params: unknown[]): Promise<ResultSetHeader>;

  close(): Promise<void>;
}
