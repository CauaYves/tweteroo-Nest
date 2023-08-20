import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty({message: 'All fields are required!'})
  @IsUrl()
  avatar: string;
}
