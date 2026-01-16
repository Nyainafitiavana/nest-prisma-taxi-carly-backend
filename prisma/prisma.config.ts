import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: `${process.env.DB_TYPE}//${process.env.DB_USER}:${process.env.DB_PASSWORD}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },
});
