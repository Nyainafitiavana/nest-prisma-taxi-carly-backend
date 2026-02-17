import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Paginate } from '../../../../utils/custom.interface';
import { partenaires, Prisma } from '../../../../../generated/prisma/client';
import Helper from '../../../../utils/helper';
import { GetAllPartenairesQuery } from '../impl/get-all-partenaires.query';

@QueryHandler(GetAllPartenairesQuery)
export class GetAllPartenairesHandler implements IQueryHandler<GetAllPartenairesQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: Helper,
  ) {}

  async execute(
    params: GetAllPartenairesQuery,
  ): Promise<Paginate<partenaires[]>> {
    const { limit, page, value } = params;

    const query: Prisma.partenairesFindManyArgs = {
      orderBy: { id: 'asc' },
      where: value
        ? {
            OR: [
              { nom: { contains: value } },
              { email: { contains: value } },
              { telephone: { contains: value } },
              {
                adresse: {
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
      this.prisma.partenaires.findMany(query),
      this.prisma.partenaires.count({ where: query.where }),
    ]);

    return { data: data, totalRows: count, page: page ?? 1 };
  }
}
