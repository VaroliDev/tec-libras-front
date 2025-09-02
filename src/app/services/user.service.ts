import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  API_URL = API_URL
  
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/user`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, user);
  }
  
  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.API_URL}/user/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.API_URL}/user/${userId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/user/${userId}`);
  }

  renewData(token: string): Observable<any> {
    return this.http.post(`${this.API_URL}/renewData`, { token });
  }

  doesUserExists(user_name: string): Observable <any>{
    return this.http.post(`${this.API_URL}/doesExists`, { user_name });
  }

  getUserRole(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/user/${userId}/role`);
  }

  changeUserRole(userId: number): Observable<any>{
    return this.http.get(`${this.API_URL}/user/${userId}/change`);
  }
}