import { Injectable } from '@nestjs/common';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';

@Injectable()
export class TarifService {
  constructor() {}

  create(createTarifDto: CreateTarifDto) {
    console.log(createTarifDto);
    return 'This action adds a new tarif';
  }

  findAll() {
    return `This action returns a list of tarif`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tarif`;
  }

  update(id: number, updateTarifDto: UpdateTarifDto) {
    console.log(updateTarifDto);
    return `This action updates a #${id} tarif`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarif`;
  }
}
