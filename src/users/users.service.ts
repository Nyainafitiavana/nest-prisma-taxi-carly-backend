import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import Helper from '../utils/helper';
import { ExecuteResponse, Paginate } from '../utils/custom.interface';
import { Prisma, Users } from '../../generated/prisma/client';
import { CustomException } from 'src/utils/ExeptionCustom';
import { MESSAGE } from '../utils/constant';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private helper: Helper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ExecuteResponse> {
    await this.prisma.users.create({
      data: {
        ...createUserDto,
        password: 'default password',
        username: `${createUserDto.nom} ${createUserDto.prenom}`,
      },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }

  async findAll(
    limit: number | null,
    page: number | null,
    keyword: string,
  ): Promise<Paginate<Users[]>> {
    const query: Prisma.UsersFindManyArgs = {
      select: {
        id: true,
        nom: true,
        prenom: true,
        telephone: true,
        addressePersonnelle: true,
        addresseProfessionnelle: true,
        email: true,
        roles: true,
      },
      orderBy: { nom: 'asc' },
      where: keyword
        ? {
            OR: [
              { nom: { contains: keyword } },
              { prenom: { contains: keyword } },
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

  async findOne(id: number): Promise<Users> {
    const user: Users | null = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new CustomException(MESSAGE.ID_NOT_FOUND, HttpStatus.CONFLICT);
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ExecuteResponse> {
    const findUser: Users = await this.findOne(id);

    await this.prisma.users.update({
      where: {
        id: findUser.id,
      },
      data: {
        ...updateUserDto,
      },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }

  async remove(id: number): Promise<ExecuteResponse> {
    const findUser: Users = await this.findOne(id);

    await this.prisma.users.delete({
      where: {
        id: findUser.id,
      },
    });

    return { message: MESSAGE.OK, statusCode: HttpStatus.OK };
  }
}
