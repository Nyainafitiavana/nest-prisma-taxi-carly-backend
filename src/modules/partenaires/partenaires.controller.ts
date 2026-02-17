import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Next,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import express from 'express';
import Helper, { QueryParams } from '../../utils/helper';
import { ExecuteResponse, Paginate } from '../../utils/custom.interface';
import { AuthGuard } from '../../auth/auth.guard';
import { partenaires } from '../../../generated/prisma/client';
import { CreatePartenaireDTO } from './dto/create-partenaire.dto';
import { CreatePartenaireCommand } from './commands/impl/create-partenaire.command';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { UpdatePartenaireCommand } from './commands/impl/update-partenaire.command';
import { GetAllPartenairesQuery } from './queries/impl/get-all-partenaires.query';
import { GetPartenaireByIdQuery } from './queries/impl/get-partenaire-by-id.queries';
import { DeletePartenaireCommand } from './commands/impl/delete-partenaire.command';

@Controller('/api/partenaires')
@UseGuards(AuthGuard)
export class PartenairesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly helper: Helper,
  ) {}

  @Post()
  async create(
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
    @Body() createPartenaireDto: CreatePartenaireDTO,
  ): Promise<void> {
    try {
      const create: ExecuteResponse = await this.commandBus.execute(
        new CreatePartenaireCommand(createPartenaireDto),
      );

      res.status(HttpStatus.OK).json(create);
    } catch (error) {
      next(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartenaireDto: UpdatePartenaireDto,
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
  ): Promise<void> {
    try {
      const update: ExecuteResponse = await this.commandBus.execute(
        new UpdatePartenaireCommand(+id, updatePartenaireDto),
      );

      res.status(HttpStatus.OK).json(update);
    } catch (error) {
      next(error);
    }
  }

  @Get()
  async findAll(
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
    @Req() req: express.Request,
  ): Promise<void> {
    try {
      const queryParams: QueryParams = this.helper.buildQueryParams(req);

      const data: Paginate<partenaires[]> = await this.queryBus.execute(
        new GetAllPartenairesQuery(
          queryParams.limit,
          queryParams.page,
          queryParams.value,
        ),
      );

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
  ): Promise<void> {
    try {
      const task: partenaires = await this.queryBus.execute(
        new GetPartenaireByIdQuery(+id),
      );

      res.status(HttpStatus.OK).json(task);
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
  ): Promise<void> {
    try {
      const deleted: ExecuteResponse = await this.commandBus.execute(
        new DeletePartenaireCommand(+id),
      );
      res.status(HttpStatus.OK).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}
