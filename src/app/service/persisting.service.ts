import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistingService {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
  