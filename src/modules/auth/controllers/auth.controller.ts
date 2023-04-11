import { User } from '@/decorators';
import { AuthGuard } from '@/guards';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserLoginDto } from '../dtos';
import { AuthService } from '../services';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.generateToken(user);

    return {
      access_token: token,
    };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: { user: unknown }) {
    return req.user;
  }

  @Get('dec')
  getDecorator(@User() user: unknown) {
    return user;
  }

  @Get('env')
  getEnv() {
    return this.configService;
  }
}
