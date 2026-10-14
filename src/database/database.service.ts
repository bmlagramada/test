// import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import * as mysql from 'mysql2/promise';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Injectable()
// export class DatabaseService implements OnModuleInit, OnModuleDestroy {
//   pool!: mysql.Pool;

//   async onModuleInit() {
//     this.pool = mysql.createPool({
//       host: process.env.DB_HOST || 'mysql-bd84b75-gbox-a049.g.aivencloud.com',
//       port: +(process.env.DB_PORT || 24922),
//       user: process.env.DB_USER || 'avnadmin',
//       password: process.env.DB_PASSWORD || 'AVNS_P83aNMZh7F1Ma6rdmmv',
//       database: process.env.DB_NAME || 'defaultdb',
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });
//     // optional: test connection
//     const conn = await this.pool.getConnection();
//     await conn.ping();
//     conn.release();
//     console.log('MySQL pool created');
//   }

//   async onModuleDestroy() {
//     await this.pool.end();
//   }

//   getPool() {
//     return this.pool;
//   }
// }


import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: mysql.Pool;

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 24922),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Optional: test connection
    const conn = await this.pool.getConnection();
    await conn.ping();
    conn.release();
    console.log('MySQL pool created successfully');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('MySQL pool closed');
  }

  getPool() {
    return this.pool;
  }
}
