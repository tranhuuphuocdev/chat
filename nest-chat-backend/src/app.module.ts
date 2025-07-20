import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configObject, validateSchemaConfig } from '@core/configs/global';
import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import { ChatModule } from '@chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { verifyTokenMiddleware } from '@core/middlewares/auth.middleware';
import { UserController } from '@modules/users/user.controller';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validateSchemaConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(configObject.MONGO_DB_URL),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyTokenMiddleware).forRoutes(UserController);
  }
}
