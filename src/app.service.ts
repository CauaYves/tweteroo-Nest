import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  private users: CreateUserDto[] = [];
  createUserService(username: string, avatar: string): void {
    this.users.push({ username, avatar });
  }
}
