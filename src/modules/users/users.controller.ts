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
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { GetAllUsersQuery } from './queries/impl/get-all-users.query';
import { GetUserQuery } from './queries/impl/get-user.queries';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import Helper, { QueryParams } from '../../utils/helper';
import { ExecuteResponse, Paginate } from '../../utils/custom.interface';
import { Users } from '../../../generated/prisma/client';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('/api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly helper: Helper,
  ) {}

  @Post()
  async create(
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    try {
      const create: ExecuteResponse = await this.commandBus.execute(
        new CreateUserCommand(createUserDto),
      );

      res.status(HttpStatus.OK).json(create);
    } catch (error) {
      next(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: express.Response,
    @Next() next: express.NextFunction,
  ): Promise<void> {
    try {
      const update: ExecuteResponse = await this.commandBus.execute(
        new UpdateUserCommand(+id, updateUserDto),
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

      const data: Paginate<Users[]> = await this.queryBus.execute(
        new GetAllUsersQuery(
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
      const task: Users = await this.queryBus.execute(new GetUserQuery(+id));

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
        new DeleteUserCommand(+id),
      );
      res.status(HttpStatus.OK).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}
