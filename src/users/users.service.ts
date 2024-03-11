import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { google } from 'googleapis';
import * as bcrypt from 'bcrypt';
import config from '../config';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const password = user.password;
    const hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
    user.password = hash;
    const newUser = new this.userModel(user);
    await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = newUser.toObject();
    return {
      ...result,
      password: '',
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(
    res: Response,
    username: string,
    userData: Partial<User>,
  ): Promise<User> {
    // update only user associated with token
    const user = res.locals.user;
    if (user?.username !== username) {
      throw new UnauthorizedException('Unauthorized');
    }
    const updatedUser = await this.userModel
      .findOne({ username: username })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    updatedUser.set(userData);
    return await updatedUser.save();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async googleLogin(token: string): Promise<User> {
    const client = new google.auth.OAuth2();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    if (!email) {
      throw new UnauthorizedException('Invalid token');
    }

    let user = await this.findOneByEmail(email);
    if (!user) {
      user = await this.createUser({
        username: payload.name,
        name: payload.name,
        email: payload.email,
        password: '', // For Google login, we don't need a password
        role: 'member', // New users are assigned the member role by default
      });
    }

    return user;
  }
}
