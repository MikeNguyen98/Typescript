import { Teacher } from './entities/teacher.entity';
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
@Injectable()// connect redis cache ?kafka apache 
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}
  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async create(contact: Teacher): Promise<Teacher> {
    return await this.teacherRepository.save(contact);
  }

  async update(contact: Teacher): Promise<UpdateResult> {
    return await this.teacherRepository.update(contact.id, contact);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.teacherRepository.delete(id);
  }
}
