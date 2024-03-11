import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { AuthGuard } from './../auth/auth.guard';
import { RolesGuard } from './../auth/roles.guard';
import { Roles } from './../auth/roles.decorator';
import { Role } from './../auth/role.enum';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchMovies(@Query('q') query: string): Promise<Movie[]> {
    return this.moviesService.searchMovies(query);
  }

  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovie(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(120)
  @Get()
  async getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async addMovie(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.addMovie(movie);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() movie: Partial<Movie>,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, movie);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }
}
