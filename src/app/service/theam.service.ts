import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheamService {
  private darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;

    const body = document.body;
    if (this.darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

   
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      this.darkMode = true;
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
  }

