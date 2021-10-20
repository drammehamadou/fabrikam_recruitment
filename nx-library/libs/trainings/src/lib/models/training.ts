import { Course } from './course';

export class Training {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  images?: string[];
  price?: number;
  course?: Course;
  countInTraining?: number;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}