import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Get()
  index(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }
  @Post('create')
  async create(@Body() teacherData: Teacher): Promise<Teacher> {
    return this.teacherService.create(teacherData);
  }
  // tim hieu ve cac @
  @Put(':id/update')
  async update(
    @Param('id') id: number,
    @Body() teacherData: Teacher,
  ): Promise<any> {
    teacherData.id = Number(id);
    console.log('Update #' + teacherData.id);
    return this.teacherService.update(teacherData);
  }
  // @Patch(':id/update/:field')
  // async update(@Param('id') id, @Body('field') teacherData: Teacher): Promise<any> {
  //   teacherData.id = Number(id);
  // };
  @Delete(':id/delete')
  async delete(@Param('id') id: number): Promise<any> {
    return this.teacherService.delete(id);
  }
}
