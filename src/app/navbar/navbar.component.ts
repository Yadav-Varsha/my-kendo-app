import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TheamService } from '../service/theam.service';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class navbarComponent implements OnInit {
  constructor(public theamService: TheamService) {}

  ngOnInit(): void {
    this.theamService.applySavedTheme(); // Apply saved theme on load
  }

  toggleTheme(): void {
    this.theamService.toggleTheme(); // Switch theme on button click
  }
}
