import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }
  
  // getUsers(){
  //   const url="http://localhost:3000/users";
  //   return this.http.get(url)
  // }
  updateUser(user: any) {
    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }
  deleteUser(id: number) {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.delete(url);
  }
  addUser(user: any) {
    const url = 'http://localhost:3000/users';
    return this.http.post(url, user);
  }  
}
