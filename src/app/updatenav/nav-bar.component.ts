// import { Component } from '@angular/core';
// import { AppBarModule } from '@progress/kendo-angular-navigation';
// import { ButtonModule } from '@progress/kendo-angular-buttons';
// import { DropDownButtonModule } from '@progress/kendo-angular-buttons';
// import { AvatarModule } from '@progress/kendo-angular-layout';
// import { IconsModule } from '@progress/kendo-angular-icons';

// @Component({
//   selector: 'app-nav-bar',
//   standalone: true,
//   imports: [
//     AppBarModule,     // ✅ Provides <kendo-appbar>
//     ButtonModule,
//        // ✅ Provides <button kendoButton>
//     DropDownButtonModule,
//     AvatarModule,IconsModule,    // ✅ Provides <kendo-avatar>
//   ],
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.css']
// })
// export class NavBarComponent {
//   agentOptions = ['Add Agent', 'List Agents'];
// }
// import { Component } from '@angular/core';
// import { AppBarModule } from '@progress/kendo-angular-navigation';
// import { ButtonsModule, DropDownButtonModule } from '@progress/kendo-angular-buttons';
// import { AvatarModule } from '@progress/kendo-angular-layout';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-nav-bar',
//   standalone: true,
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.css'],
//   imports: [
//     CommonModule,
//     AppBarModule,
//     ButtonsModule,
//     DropDownButtonModule,
//     AvatarModule
//   ]
// })
// export class NavBarComponent {
//   agentOptions = [
//     { text: 'Add Agent' },
//     { text: 'View Agents' },
//     { text: 'Manage Roles' }
//   ];
// }


import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-nav-bar2',
  imports: [RouterLink],
  templateUrl: './nav-bar.component3.html',
  styleUrls: ['./nav-bar.component3.css']
})
export class NavBar3Component {}

