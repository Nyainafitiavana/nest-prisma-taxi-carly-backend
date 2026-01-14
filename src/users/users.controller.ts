import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Next,
  Req,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NextFunction, Request, Response } from 'express';
import { ExecuteResponse, Paginate } from '../utils/custom.interface';
import { Users } from '../../generated/prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/api/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const create: ExecuteResponse =
        await this.usersService.create(createUserDto);

      return res.status(HttpStatus.OK).json(create);
    } catch (error) {
      next(error);
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Next() next: NextFunction,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const limit: number | null = req.query.limit
        ? Number(req.query.limit)
        : null;
      const page: number | null = req.query.page
        ? Number(req.query.page)
        : null;
      const keyword: string = req.query.value
        ? (req.query.value as string)
        : '';

      const data: Paginate<Users[]> = await this.usersService.findAll(
        limit,
        page,
        keyword,
      );

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const user: Users = await this.usersService.findOne(Number(id));
      user.password = '';

      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const updated: ExecuteResponse = await this.usersService.update(
        +id,
        updateUserDto,
      );

      res.status(HttpStatus.OK).json(updated);
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const deleted: ExecuteResponse = await this.usersService.remove(+id);

      res.status(HttpStatus.OK).json(deleted);
    } catch (error) {
      next(error);
    }
  }
}
