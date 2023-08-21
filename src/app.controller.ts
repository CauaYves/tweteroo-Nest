import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  HttpStatus,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createTweetDto } from './dto/create-tweet.dto';
import { tweetParams } from './dto/tweet-param.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return "I'm okay!";
  }

  @Get('tweets/:username')
  getTweetFromUsername(@Param('username') username: string) {
    return this.appService.getTweetsFromUsernameService(username)
  }

  @Get('tweets')
  getTweets(@Query('page') page: string) {
    return this.appService.getTweetsService(Number(page));
  }
  @Post('sign-up')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ){
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

  @Post('tweets')
  createTweet(@Body(ValidationPipe) createTweetDto: createTweetDto,@Res() res: Response,) {
    try{
      this.appService.createTweetService(createTweetDto.tweet,createTweetDto.username,);
      return res.sendStatus(HttpStatus.CREATED);
    }catch(error){
      if(error.name === 'UnauthorizedError') return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  }
}
