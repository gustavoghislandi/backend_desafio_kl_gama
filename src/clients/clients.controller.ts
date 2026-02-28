import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {

  constructor(private readonly clientsService: ClientsService) {}

  // cria um novo cliente
  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  // lista todos os clientes
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  // busca um cliente pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(Number(id));
  }

  // atualiza um cliente
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientsService.update(Number(id), dto);
  }

  // remove um cliente
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(Number(id));
  }
}