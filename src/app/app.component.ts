import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from "./grid/grid.component";
import { NavBar3Component } from './updatenav/nav-bar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent, NavBar3Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users:any
  title = 'my-kendo-app';
//   constructor(private dataService:DataService){

//   }
//   ngOnInit(){
//     this.dataService.getUsers().subscribe((data:any)=>{
// this.users=data;
// console.log(this.users);
//     })
//   }
}
