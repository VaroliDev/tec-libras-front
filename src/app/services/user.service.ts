import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environment';
interface user {
  user_name: string
  full_name: string
  email: string
  id: number
  token: string
  first_name: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){
    effect(() => {
      this.syncUserInfoWithLocalStorage()
    })
  }

  http = inject(HttpClient)
  API_URL = API_URL
  private userInfo = signal<user | undefined>(undefined)

  getUserInfo() {
    return this.userInfo.asReadonly()
  }

  syncUserInfoWithLocalStorage(){
    let local =  localStorage.getItem('token')
    if(local){
     local = JSON.parse(local);
     //@ts-ignore
      this.setUserInfo(local)
    }
  }
  
  setUserInfo(userData: user){
    this.userInfo.set(userData)
  }
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