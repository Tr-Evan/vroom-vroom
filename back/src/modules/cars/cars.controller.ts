import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './cars.type';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @Get('user/:userId')
  getByUserId(@Param('userId') userId: string) {
    return this.service.findByUserId(Number(userId));
  }

  @Post()
  create(@Body() data: CreateCarDto) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCarDto) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}