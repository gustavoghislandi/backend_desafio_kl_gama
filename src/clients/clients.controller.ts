import { Body, Controller, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService) {}
    
    @Post()
    async create(@Body() body: { nome: string }){
        return this.clientsService.create(body.nome)
    }

}
