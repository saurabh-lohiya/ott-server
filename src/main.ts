import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exceptions.filter';
import { MongoExceptionFilter } from './exception/mongo-exception.filter';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new MongoExceptionFilter(),
  );
  app.setGlobalPrefix('api');
  await app.listen(config.port);
}
bootstrap();
