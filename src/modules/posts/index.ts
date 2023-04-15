import { AuthModule } from '@/modules/auth';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyPostController, PostController } from './controllers';
import { PostEntity } from './entities';
import { PostService } from './services';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController, MyPostController],
  providers: [PostService, JwtService],
  exports: [PostService],
})
export class PostModule {}
