import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const port = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
