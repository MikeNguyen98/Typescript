import { Teacher } from './entities/teacher.entity';
import { StudentModule } from './../student/student.module';
import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [StudentModule, TypeOrmModule.forFeature([Teacher])],
})
export class TeacherModule {}
