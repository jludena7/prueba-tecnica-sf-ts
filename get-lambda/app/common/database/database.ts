export interface IDatabase {
  connect(): Promise<void>;

  select<T>(sql: string, params: unknown[]): Promise<T[]>;

  close(): Promise<void>;
}
