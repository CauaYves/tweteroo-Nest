import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { createTweetDto } from './dto/create-tweet.dto';
import { unauthorizedError } from './errors/unauthorized-error';
import { tweetDto } from './dto/tweet.dto';

@Injectable()
export class AppService {
  getTweetsFromUsernameService(username: string) {
    const tweetsFromUser: tweetDto[] = [];
    let avatar: string = ''
    this.users.forEach((user) => {
      if(user.username === username){
        avatar = user.avatar
      }
    })
    this.tweets.forEach((tweet) => {
      if(tweet.username === username){
        const data = {
          tweet: tweet.tweet,
          avatar: avatar,
          username: tweet.username
        }
        tweetsFromUser.push(data)
      }
    })
    console.log(tweetsFromUser)
    return tweetsFromUser;
  }
  private tweets: createTweetDto[] = [];
  private users: CreateUserDto[] = [];
  
  getTweetsService(params: number) {
    const result = this.tweets.slice(this.tweets.length, this.tweets.length - 15)
    return result;
  }

  createTweetService(tweet: string, username: string) {
    const userExists = this.users.some((user) => user.username === username);
    
    if (!userExists) {
      throw unauthorizedError(); // Lança erro se usuário não existe
    }

    this.tweets.push({ tweet, username });
  }

  createUserService(username: string, avatar: string): void {
    this.users.push({ username, avatar });
  }
}
