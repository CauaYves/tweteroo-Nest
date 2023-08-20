import { IsNotEmpty, IsString } from 'class-validator';

export class createTweetDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  tweet: string;
}
