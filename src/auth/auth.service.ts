import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    const hashedPassword = await argon2.hash(password);

    if (user) throw new ConflictException('User already exists');

    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
        updatedAt: new Date(),
      },
    });
  }

  generateToken(user: { id: number; email: string; role: string }) {
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }),
      user,
    };
  }
}
