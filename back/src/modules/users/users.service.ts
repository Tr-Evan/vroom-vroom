
import { User } from "src/infrastructure/entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./users.types";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find({
      relations: ['cars'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['cars'],
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<User | null> {
    await this.usersRepo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }
}