import mysql, {
  Connection,
  ConnectionOptions,
  ResultSetHeader,
} from "mysql2/promise";
import { IDatabase } from "../database";
import logger from "../../logger";

export class MysqlDatabase implements IDatabase {
  private connection: Connection | null;

  constructor(private config: ConnectionOptions) {
    this.connection = null;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.connection) {
        this.connection = await mysql.createConnection(this.config);
        logger.info("Connected to MySQL database");
      }
    } catch (error) {
      logger.error("Error connecting to MySQL database", { error });
      throw error;
    }
  }

  public async insert(
    sql: string,
    params: unknown = [],
  ): Promise<ResultSetHeader> {
    if (!this.connection) {
      throw new Error("Connection not established. Call connect() first.");
    }
    try {
      const [rows] = await this.connection.execute(sql, params);
      return rows as ResultSetHeader;
    } catch (error) {
      logger.error("Error executing query", { sql, params, error });
      throw error;
    }
  }

  public async close(): Promise<void> {
    if (!this.connection) {
      return;
    }

    try {
      await this.connection.end();
      logger.info("Connection to MySQL closed");
    } catch (error) {
      logger.error("Error closing MySQL connection", { error });
      throw error;
    }
  }
}
