import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment }  from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  apiURLCourses = environment.apiUrl + 'courses';

  constructor(private http: HttpClient) { 

  }

  getCourse(courseId : string): Observable<Course> {
    return this.http.get<Course>(`${this.apiURLCourses}/${courseId}`)
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiURLCourses)
  }

  createCourse(course: Course): Observable<Course>  {
    return this.http.post<Course>(this.apiURLCourses, course)
  }

  updateCourse(course: Course): Observable<Course>  {
    return this.http.put<Course>(
      `${this.apiURLCourses}/${course.id}`, course)
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCourses}/${courseId}`)
  }
}
