
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/employees');
  }

 

  add(employee: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/employees', employee);
  }

  update(employee: any): Observable<any> {
    const id = employee.id || employee.recordId;
    return this.http.put<any>(`${'http://localhost:3000/employees'}/${id}`, employee);
  }

  save(employee: any, isNew?: boolean): Observable<any> {
    if (isNew) {
      return this.add(employee);
    } else {
      return this.update(employee);
    }
  }


}
