import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@users/user.model';
import { UserRepository } from '@users/user.repository.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
    ]),
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [MongooseModule, UserRepository, AuthService],
})
export class AuthModule {}
