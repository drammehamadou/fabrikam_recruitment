import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { 

  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:2021/api/v1/courses/')
  }

  createCourse(course: Course): Observable<Course>  {
    return this.http.post<Course>('http://localhost:2021/api/v1/courses/', course)
  }

  deleteCourse(courseId: string): Observable<Object> {
    return this.http.delete<Object>(`http://localhost:2021/api/v1/courses/${courseId}`)
  }
}
