import { createConnection  } from 'typeorm';

const entities =
  process.env.NODE_ENV === 'dev'
    ? 'dist/**/**.entity.js'
    : 'src/**/*.entity.ts';

export const connection = createConnection({
  type: 'mongodb',
  url: 'mongodb://root:rootpassword@localhost:27017/?authSource=admin&ssl=false',
  database: 'nest',
  entities: [entities],
  logging: true,
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const DatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await connection,
  },
];
