import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async getMovie(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec();
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async searchMovies(query: string): Promise<Movie[]> {
    console.log('query', query);
    return await this.movieModel
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }

  async addMovie(movie: Movie): Promise<Movie> {
    const newMovie = new this.movieModel(movie);
    return await newMovie.save();
  }

  async updateMovie(id: string, movie: Partial<Movie>): Promise<Movie> {
    return await this.movieModel
      .findByIdAndUpdate(id, movie, { new: true })
      .exec();
  }

  async deleteMovie(id: string): Promise<void> {
    await this.movieModel.findByIdAndDelete(id).exec();
  }
}
