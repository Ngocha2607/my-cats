import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly listCats: Cat[] = [];
  private id = 1;
  create(createCatDto: CreateCatDto) {
    const newCat = { id: this.id++, ...createCatDto };
    this.listCats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.listCats;
  }

  findOne(id: number) {
    const cat = this.listCats.find((cat) => cat.id === id);
    if (!cat) {
      throw new Error(`Cat with id ${id} not found`);
    }
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    const cat = this.findOne(id);
    Object.assign(cat, updateCatDto);
    return cat;
  }

  remove(id: number) {
    const index = this.listCats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new Error(`Cat with id ${id} not found`);
    }
    this.listCats.splice(index, 1);
    return { message: `Cat with id ${id} removed successfully` };
  }
}
