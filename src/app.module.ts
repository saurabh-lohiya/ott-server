import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import config from './config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  // ...

  imports: [
    DatabaseModule,
    MoviesModule,
    UserModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        isGlobal: true,
        store: redisStore as any,
        host: 'localhost',
        port: 6379,
      }),
    }),
    MongooseModule.forRoot(config.mongoUrl),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
