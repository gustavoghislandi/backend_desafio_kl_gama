import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {

  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() body: { nome: string }) {
    return this.clientsService.create(body.nome);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { nome: string }) {
    return this.clientsService.update(Number(id), body.nome);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(Number(id));
  }

}
