import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './entities/movie.entity';
import { MongoClient } from 'mongodb';
import config from '../config';
import { User, UserSchema } from '../users/entities/user.entity';
import { MoviesModule } from './movies.module';

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(config.mongoUrl);
    db = connection.db(config.dbName);
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MoviesModule,
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesController = module.get<MoviesController>(MoviesController);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should return a list of movies', async () => {
    const mockMovies = [
      {
        title: 'Test Movie',
        cast: ['Abhay Deol'],
        director: 'Anurag kashap',
        streamingLink: 'https://www.netflix.com/in/title/70178217',
        genre: ['Drama'],
        rating: 4,
      },
    ];
    jest
      .spyOn(moviesService, 'getAllMovies')
      .mockImplementation(() => Promise.resolve(mockMovies));

    expect(await moviesController.getAllMovies()).toBe(mockMovies);
  });

  it('should return a specific movie', async () => {
    const result = {
      title: 'Test Movie',
      cast: ['Abhay Deol'],
      director: 'Anurag kashap',
      streamingLink: 'https://www.netflix.com/in/title/70178217',
      genre: ['Drama'],
      rating: 4,
    };
    jest
      .spyOn(moviesService, 'getMovie')
      .mockImplementation(() => Promise.resolve(result));

    expect(await moviesController.getMovie('1')).toBe(result);
  });

  it('should create a movie', async () => {
    const result = {
      title: 'Test Movie',
      cast: ['Abhay Deol'],
      director: 'Anurag kashap',
      streamingLink: 'https://www.netflix.com/in/title/70178217',
      genre: ['Drama'],
      rating: 4,
    };
    jest
      .spyOn(moviesService, 'addMovie')
      .mockImplementation(() => Promise.resolve(result));

    expect(await moviesController.addMovie(result)).toBe(result);
  });

  it('should update a movie', async () => {
    const result = {
      title: 'Test Movie',
      cast: ['Abhay Deol'],
      director: 'Anurag kashap',
      streamingLink: 'https://www.netflix.com/in/title/70178217',
      genre: ['Drama'],
      rating: 4,
    };
    jest
      .spyOn(moviesService, 'updateMovie')
      .mockImplementation(() => Promise.resolve(result));

    expect(await moviesController.updateMovie('1', result)).toBe(result);
  });

  it('should delete a movie', async () => {
    const result = {
      title: 'Test Movie',
      cast: ['Abhay Deol'],
      director: 'Anurag kashap',
      streamingLink: 'https://www.netflix.com/in/title/70178217',
      genre: ['Drama'],
      rating: 4,
    };
    jest
      .spyOn(moviesService, 'deleteMovie')
      .mockImplementation(() => Promise.resolve());

    expect(await moviesController.deleteMovie('1')).toBe(result);
  });
});
