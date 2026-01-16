import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.queries';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Users } from '../../../../../generated/prisma/client';
import { NotFoundException } from '@nestjs/common';
import { MESSAGE } from '../../../../utils/constant';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUserQuery): Promise<Users> {
    const user: Users | null = await this.prisma.users.findUnique({
      where: { id: query.id },
    });

    if (!user) {
      throw new NotFoundException(`${query.id} ${MESSAGE.ID_NOT_FOUND}`);
    }

    user.password = '';
    return user;
  }
}
