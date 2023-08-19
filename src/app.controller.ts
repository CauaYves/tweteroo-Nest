import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-up')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ): void {
    try {
      this.appService.createUserService(
        createUserDto.username,
        createUserDto.avatar,
      );
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Erro ao criar usuário' });
    }
  }
}
