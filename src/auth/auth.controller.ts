import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  loginUser(@Req() req: Request) {
    return this.authService.generateToken(req.user as { id: number; email: string; role: string });
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    const user = req.user as { id: number; email: string; role: string };
    return { isLoggedIn: true, user };
  }

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard) // Apply JWT and Roles guards
  @Roles('admin') // Only admins can access this route
  adminOnly(@Req() req: Request) {
    return { message: 'Welcome, admin!' , user: req.user};
  }

  @Get('student-only')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles('student') // Only students can access this route
  studentOnly(@Req() req: Request) {
    return { message: 'Welcome, student!', user: req.user};
  }
}