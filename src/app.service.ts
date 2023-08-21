import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { createTweetDto } from './dto/create-tweet.dto';
import { unauthorizedError } from './errors/unauthorized-error';
import { tweetDto } from './dto/tweet.dto';

@Injectable()
export class AppService {
  private tweets: createTweetDto[] = [];
  private users: CreateUserDto[] = [];

  getTweetsFromUsernameService(username: string) {
    const tweetsFromUser: tweetDto[] = [];
    let avatar: string = ''
    this.users.forEach((user) => {
      if(user.username === username){
        avatar = user.avatar
      }
    })
    this.tweets.forEach((tweet) => {
      if(tweet.username === username) {
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
  

  getTweetsService(page: number) {
    if (page < 1) {
      throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
    }
    const tweetsArray = this.tweets
    if(!page){
      const lastTweets = tweetsArray
      .slice(tweetsArray.length - 15, tweetsArray.length)
      .map((tweet) => {
        const user = this.users.find((user) => user.username === tweet.username);
        return {
          username: tweet.username,
          avatar: user ? user.avatar : '',
          tweet: tweet.tweet,
        };
      });

    return lastTweets;
    }

    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;

    const paginatedTweets = this.tweets
      .slice(startIndex, endIndex)
      .map((tweet) => {
        const user = this.users.find((user) => user.username === tweet.username);
        return {
          username: tweet.username,
          avatar: user ? user.avatar : '',
          tweet: tweet.tweet,
        };
      });

    return paginatedTweets;
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
