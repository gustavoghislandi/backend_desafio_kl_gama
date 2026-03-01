import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request } from 'express';

@Controller('demands')
@UseGuards(JwtAuthGuard) // aplica proteção JWT
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @Post()
  create(@Body() dto: CreateDemandDto, @Req() req: Request) {
    const clientId = req['client'].id;
    return this.demandsService.create(dto, clientId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const clientId = req['client'].id;
    return this.demandsService.findAllByClient(clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const clientId = req['client'].id;
    return this.demandsService.findOneByClient(Number(id), clientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDemandDto, @Req() req: Request) {
    const clientId = req['client'].id;
    return this.demandsService.updateByClient(Number(id), dto, clientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const clientId = req['client'].id;
    return this.demandsService.removeByClient(Number(id), clientId);
  }
}