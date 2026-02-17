import { Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { PartenairesController } from './partenaires.controller';
import { PrismaService } from '../../prisma/prisma.service';
import Helper from '../../utils/helper';
import { DeletePartenaireHandler } from './commands/handlers/delete-partenaire.handler';
import { GetAllPartenairesHandler } from './queries/handlers/get-all-partenaires.handler';
import { UpdatePartenaireHandler } from './commands/handlers/update-partenaire.handler';
import { CreatePartenaireHandler } from './commands/handlers/create-partenaire.handler';
import { GetPartenaireByIdHandler } from './queries/handlers/get-partenaire-by-id.handler';
import { GetExistPartenaireByNameHandler } from './queries/handlers/get-partenaire-by-name.handler';

// Types explicites
export const CommandHandlers: Array<Type<ICommandHandler>> = [
  CreatePartenaireHandler,
  UpdatePartenaireHandler,
  DeletePartenaireHandler,
];

export const QueryHandlers: Array<Type<IQueryHandler>> = [
  GetPartenaireByIdHandler,
  GetExistPartenaireByNameHandler,
  GetAllPartenairesHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [PartenairesController],
  providers: [PrismaService, ...CommandHandlers, ...QueryHandlers, Helper],
})
export class PartenairesModule {}
