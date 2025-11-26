
import { User } from "src/infrastructure/entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./users.types";
import { UsersModel } from "./users.model";
import { UsersRepository } from "./users.repository";


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
  ) {}

  async findAll(): Promise<UsersModel[]> {
      return await this.usersRepo.findAll()
    }
  
    async findById(id: number): Promise<UsersModel | null> {
      return await this.usersRepo.findById(id)
    }
  
    async create(data: CreateUserDto): Promise<UsersModel> {
      return await this.usersRepo.create(data);
    }
  
    async update(id: number, data: UpdateUserDto): Promise<UsersModel | null> {
      return await this.usersRepo.update(id, data);
    }
  
    async delete(id: number): Promise<void> {
      return await this.usersRepo.delete(id);
    }
}