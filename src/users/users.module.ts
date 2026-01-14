import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import Helper from '../utils/helper';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, Helper],
})
export class UsersModule {}
