import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../../prisma/prisma.service';
import { partenaires } from '../../../../../generated/prisma/client';
import { NotFoundException } from '@nestjs/common';
import { MESSAGE } from '../../../../utils/constant';
import { GetPartenaireByIdQuery } from '../impl/get-partenaire-by-id.queries';

@QueryHandler(GetPartenaireByIdQuery)
export class GetPartenaireByIdHandler implements IQueryHandler<GetPartenaireByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetPartenaireByIdQuery): Promise<partenaires> {
    const partenaireData: partenaires | null =
      await this.prisma.partenaires.findUnique({
        where: { id: query.id },
      });

    if (!partenaireData) {
      throw new NotFoundException(`${query.id} ${MESSAGE.ID_NOT_FOUND}`);
    }

    return partenaireData;
  }
}
