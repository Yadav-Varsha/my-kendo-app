import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar3Component } from './updatenav/nav-bar.component';
import { EditComponent } from "./edit/edit.component";
import { MainpageComponent } from './mainpage/mainpage.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar3Component,EditComponent,MainpageComponent],
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
