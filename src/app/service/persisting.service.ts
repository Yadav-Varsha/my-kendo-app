import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistingService {
  set(key: string, value: any): void {
    // console.log(`Saving [${key}]`, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const data = localStorage.getItem(key);
    // console.log(`Loading [${key}]`, data);
    return data ? JSON.parse(data) : null;
  }

   remove(key: string): void {
    localStorage.removeItem(key); // <-- Add this
  }
}
  