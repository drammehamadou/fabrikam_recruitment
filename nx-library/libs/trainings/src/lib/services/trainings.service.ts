import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Training } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  apiURLCourses = environment.apiUrl + 'trainings';

  constructor(private http: HttpClient) {}

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiURLCourses);
  }

//   createTraining(trainingData: FormData): Observable<Training> {
//     return this.http.post<Training>(this.apiURLTrainings, trainingData);
//   }

//   getTraining(trainingId: string): Observable<Training> {
//     return this.http.get<Training>(`${this.apiURLTrainings}/${trainingId}`);
//   }

//   updateTraining(trainingData: FormData, trainingid: string): Observable<Training> {
//     return this.http.put<Training>(`${this.apiURLTrainings}/${trainingid}`, trainingData);
//   }

//   deleteTraining(trainingId: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiURLTrainings}/${trainingId}`);
//   }
}
