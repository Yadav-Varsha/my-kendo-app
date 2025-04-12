import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

import { LayoutModule } from "@progress/kendo-angular-layout";
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { IconsModule } from "@progress/kendo-angular-icons";
import { NavigationModule } from "@progress/kendo-angular-navigation";
import { NavbarComponent } from "./navbar.component";

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ToolBarModule } from '@progress/kendo-angular-toolbar';

@NgModule({

  imports: [
    ToolBarModule, 
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    LayoutModule,
    IndicatorsModule,
    IconsModule,
    NavigationModule,
    ButtonsModule,
  ],
  declarations: [NavbarComponent],
 bootstrap: [NavbarComponent]
})
export class NavbarModule {}



// import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { CommonModule } from "@angular/common";

// import { LayoutModule } from "@progress/kendo-angular-layout";
// import { IndicatorsModule } from "@progress/kendo-angular-indicators";
// import { IconsModule } from "@progress/kendo-angular-icons";
// import { NavigationModule } from "@progress/kendo-angular-navigation";

// import { AppComponent } from "./app.component";
// import { ButtonsModule } from "@progress/kendo-angular-buttons";

// @NgModule({
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     CommonModule,
//     LayoutModule,
//     IndicatorsModule,
//     IconsModule,
//     NavigationModule,
//     ButtonsModule,
//   ],
//   declarations: [AppComponent],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}




// import { NavbarModule } from './navbar/navbar.module';

// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     NavbarModule
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}
