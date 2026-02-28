import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';

@Controller('demands')
export class DemandsController {

  constructor(private readonly demandsService: DemandsService) {}

  // cria uma nova demanda
  @Post()
  create(@Body() dto: CreateDemandDto) {
    return this.demandsService.create(dto);
  }

  // lista todas as demandas
  @Get()
  findAll() {
    return this.demandsService.findAll();
  }

  // busca uma demanda pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandsService.findOne(Number(id));
  }

  // atualiza uma demanda
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDemandDto) {
    return this.demandsService.update(Number(id), dto);
  }

  // remove uma demanda
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandsService.remove(Number(id));
  }
}