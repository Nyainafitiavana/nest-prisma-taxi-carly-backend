import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { partenaires } from '../../../../../generated/prisma/client';
import { GetExistPartenaireQuery } from '../impl/get-partenaire-by-name.queries';

@QueryHandler(GetExistPartenaireQuery)
export class GetExistPartenaireByNameHandler implements IQueryHandler<GetExistPartenaireQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetExistPartenaireQuery): Promise<boolean> {
    const partenaireData: partenaires | null =
      await this.prisma.partenaires.findFirst({
        where: {
          nom: {
            equals: query.nom,
          },
        },
      });

    return !!partenaireData;
  }
}
