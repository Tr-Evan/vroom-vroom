import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatsDto, UpdateStatsDto } from './stats.type';

@Controller('stats')
export class StatsController {
  constructor(private readonly service: StatsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: CreateStatsDto) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateStatsDto) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}