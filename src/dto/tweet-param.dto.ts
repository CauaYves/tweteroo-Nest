import { IsNotEmpty, IsString } from "class-validator";

export class tweetParams {
  @IsNotEmpty()
  @IsString()
  page: string;
}