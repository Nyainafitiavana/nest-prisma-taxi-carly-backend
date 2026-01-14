import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TarifService } from './tarif.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/api/tarif')
@UseGuards(AuthGuard)
export class TarifController {
  constructor(private readonly tarifService: TarifService) {}

  @Post()
  create(@Body() createTarifDto: CreateTarifDto) {
    return this.tarifService.create(createTarifDto);
  }

  @Get()
  findAll() {
    return this.tarifService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarifService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarifDto: UpdateTarifDto) {
    return this.tarifService.update(+id, updateTarifDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarifService.remove(+id);
  }
}
