import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm'
import {
  SnakeNamingStrategy,
} from 'typeorm-snake-naming-strategy'
import { ENTITIES } from '../entity'

class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = 'default'

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.log('Database.getConnection()-using existing connection ...')
      connection = await this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      console.log('Database.getConnection()-creating connection ...')
      const connectionOptions: ConnectionOptions = {
        name: 'default',
        type: 'mssql',
        // port: 3306,
        synchronize: true,
        logging: true,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        namingStrategy: new SnakeNamingStrategy(),
        entities: ENTITIES,
      }

      connection = await createConnection(connectionOptions)
    }

    return connection
  }
}

export default Database

