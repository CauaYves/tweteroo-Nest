import { IsNotEmpty, IsString } from 'class-validator';

export class tweetDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  tweet: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}
