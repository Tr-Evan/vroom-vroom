import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersModel } from "./users.model";
import { User } from "../../infrastructure/entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "./users.types";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  private toModel(entity: User): UsersModel {
    return new UsersModel(
      entity.id,
      entity.name,
    );
  }
  async findAll(): Promise<UsersModel[]> {
      const entities = await this.repo.find();
  
      return entities.map(e => this.toModel(e));
    }
  
    async findById(id: number): Promise<UsersModel | null> {
      const entity = await this.repo.findOne({
        where: { id },
      });
  
      return entity ? this.toModel(entity) : null;
    }
  
    async create(data: CreateUserDto): Promise<UsersModel> {
      const entity = this.repo.create(data);
      const saved = await this.repo.save(entity);
      return this.toModel(saved);
    }
  
    async update(id: number, data: UpdateUserDto): Promise<UsersModel | null> {
      await this.repo.update(id, data);
      return this.findById(id);
    }
  
    async delete(id: number): Promise<void> {
      await this.repo.delete(id);
    }
}