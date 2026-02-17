import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { PartenairesModule } from './modules/partenaires/partenaires.module';

@Module({
  imports: [PrismaModule, UsersModule, PartenairesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
