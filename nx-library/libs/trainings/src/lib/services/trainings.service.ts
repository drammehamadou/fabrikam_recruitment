import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Training } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  apiURLTrainings = environment.apiUrl + 'trainings';

  constructor(private http: HttpClient) {}

  getTrainings(coursesFilter?: string[] ): Observable<Training[]> {
    let params = new HttpParams();
    if(coursesFilter) {
      params = params.append('courses', coursesFilter.join(','))
    }
    return this.http.get<Training[]>(this.apiURLTrainings, {
      params : params
    });
  }

  createTraining(trainingData: FormData): Observable<Training> {
    return this.http.post<Training>(this.apiURLTrainings, trainingData);
  }

  getTraining(trainingId: string): Observable<Training> {
    return this.http.get<Training>(`${this.apiURLTrainings}/${trainingId}`);
  }

  updateTraining(trainingData: FormData, trainingid: string): Observable<Training> {
    return this.http.put<Training>(`${this.apiURLTrainings}/${trainingid}`, trainingData);
  }

  deleteTraining(trainingId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLTrainings}/${trainingId}`);
  }

  getTrainingsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLTrainings}/get/count`)
      .pipe(map((objectValue: any) => objectValue.trainingCount));
  }

  getFeaturedTrainings(count: number): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiURLTrainings}/get/featured/${count}`);
  }
}
