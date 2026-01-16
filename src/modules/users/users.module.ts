import { Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ICommandHandler, IQueryHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersController } from './users.controller';

// Command Handlers
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';

// Query Handlers
import { GetUserHandler } from './queries/handlers/get-user.handler';

// Event Handlers
import { UserCreatedHandler } from './events/handlers/user-created.handler';
import { GetAllUsersHandler } from './queries/handlers/get-all-tasks.handler';
import { PrismaService } from '../../prisma/prisma.service';
import Helper from '../../utils/helper';

// Types explicites
export const CommandHandlers: Array<Type<ICommandHandler>> = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];

export const QueryHandlers: Array<Type<IQueryHandler>> = [
  GetUserHandler,
  GetAllUsersHandler,
];

export const EventHandlers: Array<Type<IEventHandler>> = [UserCreatedHandler];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    PrismaService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    Helper,
  ],
})
export class UsersModule {}
