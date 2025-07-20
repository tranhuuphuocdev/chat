import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserRepository } from './user.repository.mongo';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
    ]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [MongooseModule, UserRepository, UserService],
})
export class UserModule {}
