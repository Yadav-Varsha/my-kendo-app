import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BehaviorSubject<any[]> {
  // private apiUrl = 'http://localhost:3000/users'; // JSON Server URL
  private data: any[] = [];
  private originalData: any[] = [];

  public createdItems: any[] = [];
  public updatedItems: any[] = [];
  public deletedItems: any[] = [];

  constructor(private http: HttpClient) {
    super([]);
  }

  // public read(): void {
  //   this.http.get<any[]>( 'http://localhost:3000/users').subscribe(data => this.next(data));
  // }
  public read(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      console.log('Fetched data:', data); // Debug line
      this.next(data);
    });
  }

  public create(item: any): void {
    this.http.post( 'http://localhost:3000/users', item).subscribe(() => this.read());
  }

  public update(item: any): void {
    this.http.put(`${ 'http://localhost:3000/users'}/${item.id}`, item).subscribe(() => this.read());
  }

  public remove(item: any): void {
    this.http.delete(`http://localhost:3000/users/${item.id}`).subscribe(() => this.read());
  }

  public assignValues(target: any, source: any): void {
    Object.assign(target, source);
  }

  public hasChanges(): boolean {
    return this.createdItems.length > 0 || this.updatedItems.length > 0 || this.deletedItems.length > 0;
  }

  public saveChanges(): void {
    this.originalData = [...this.data];
    this.createdItems = [];
    this.updatedItems = [];
    this.deletedItems = [];
    super.next(this.data);
  }

  public cancelChanges(): void {
    this.data = [...this.originalData];
    this.createdItems = [];
    this.updatedItems = [];
    this.deletedItems = [];
    super.next(this.data);
  }
}
// export class DataService {

//   constructor(private http:HttpClient) { }
//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:3000/users');
//   }
//   getData(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:3000/users');
//   }
  
//   // getUsers(){
//   //   const url="http://localhost:3000/users";
//   //   return this.http.get(url)
//   // }
//   updateUser(user: any): Observable<any> {
//     const id = user.id || user.recordId; 
//     return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  
//   }
  
//   deleteUser(id: number) {
//     const url = `http://localhost:3000/users/${id}`;
//     return this.http.delete(url);
//   }
//   addUser(user: any) {
//     const url = 'http://localhost:3000/users';
//     return this.http.post(url, user);
//   }  
// }
