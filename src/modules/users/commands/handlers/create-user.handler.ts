import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserCreatedEvent } from '../../events/impl/user-created.event';
import { Users } from '../../../../../generated/prisma/client';
import { ExecuteResponse } from '../../../../utils/custom.interface';
import { MESSAGE } from '../../../../utils/constant';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus, // Inject EventBus
  ) {}

  async execute(command: CreateUserCommand): Promise<ExecuteResponse> {
    const { createUserDto } = command;
    const user: Users = await this.prisma.users.create({
      data: {
        ...createUserDto,
        password: 'default password',
        username: `${createUserDto.nom} ${createUserDto.prenom}`,
      },
    });

    // Émettre l'événement
    this.eventBus.publish(
      new UserCreatedEvent(user.nom, user.prenom, user.roles, user.createdAt),
    );

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
