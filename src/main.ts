import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Enable CORS for specific origin (localhost)
   app.enableCors({
    origin: 'http://localhost:4200', // Adjust the port to match your frontend's port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(port, () =>
    console.info(`Server started. Listening at port ${port}`),
  );
}
bootstrap();
