import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from "./grid/grid.component";
import { ButtonComponent } from "./button/button.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-kendo-app';
}
