import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./users.types";

@Controller('users')
export class UsersController {
    constructor(
    private readonly service: UsersService,
  ) {}

   @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}