import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Paginate } from '../../../../utils/custom.interface';
import { Prisma, Users } from '../../../../../generated/prisma/client';
import Helper from '../../../../utils/helper';
import { GetAllUsersQuery } from '../impl/get-all-users.query';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: Helper,
  ) {}

  async execute(params: GetAllUsersQuery): Promise<Paginate<Users[]>> {
    const { limit, page, value } = params;

    const query: Prisma.UsersFindManyArgs = {
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
        addressePersonnelle: true,
        addresseProfessionnelle: true,
        roles: true,
      },
      orderBy: { id: 'asc' },
      where: value
        ? {
            OR: [
              { nom: { contains: value } },
              { prenom: { contains: value } },
              { email: { contains: value } },
              { telephone: { contains: value } },
              {
                addressePersonnelle: {
                  contains: value,
                },
              },
              {
                addresseProfessionnelle: {
                  contains: value,
                },
              },
            ],
          }
        : undefined,
    };

    if (limit && page) {
      const offset: number = this.helper.calculateOffset(limit, page);
      query.take = limit;
      query.skip = offset;
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.users.findMany(query),
      this.prisma.users.count({ where: query.where }),
    ]);

    return { data: data, totalRows: count, page: page ?? 1 };
  }
}
