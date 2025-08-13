import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:3333/'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}users`);
  }

  getUserByEmail(email: string): Observable<any> {
  return this.http.get(`${this.API_URL}user/email/${email}`);
  }

  getUserByToken(token: string): Observable<any> {
    return this.http.post(`${this.API_URL}user/token`, { token });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}user`, user);
  }

  deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.API_URL}user/${userId}`);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}login`, user);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
  return this.http.put(`${this.API_URL}user/${userId}`, updatedUser);
  }
}
