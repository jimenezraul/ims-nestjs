import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sequelize = app.get(Sequelize);
  // await sequelize.drop();
  // await sequelize.sync({ force: true }); 
  app.enableCors({
    origin: 'http://localhost:4200', // or use '*' in dev if needed
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
