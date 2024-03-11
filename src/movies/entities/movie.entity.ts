import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  genre: Array<string>;

  @Prop()
  rating: number;

  @Prop({ required: true })
  streamingLink: string;

  @Prop()
  cast: Array<string>;

  @Prop({ required: true })
  director: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
