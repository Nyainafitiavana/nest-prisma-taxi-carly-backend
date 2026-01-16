import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ExecuteResponse } from '../../../../utils/custom.interface';
import { MESSAGE } from '../../../../utils/constant';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserCommand } from '../impl/update-user.command';
import { GetUserQuery } from '../../queries/impl/get-user.queries';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<ExecuteResponse> {
    const { id, updateUserDto } = command;

    //Find if task exist
    await this.queryBus.execute(new GetUserQuery(id));

    await this.prisma.users.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
