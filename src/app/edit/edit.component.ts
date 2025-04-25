import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FormControl, FormsModule, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import {
  DataBindingDirective,
  GridModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  GridComponent as KendoGridComponent
} from "@progress/kendo-angular-grid";
import { IconModule } from "@progress/kendo-angular-icons";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { process, State } from "@progress/kendo-data-query";
@Component({
  selector: 'app-edit',
  imports: [ CommonModule,
      KENDO_GRID,
      KENDO_CHARTS,
      KENDO_INPUTS,
      KENDO_GRID_PDF_EXPORT,
      KENDO_GRID_EXCEL_EXPORT,
      FormsModule,DropDownsModule,IconModule,GridModule, ReactiveFormsModule, ],
      templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit  {
gridData: any[];
mySelection: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('myGrid') myGrid!: KendoGridComponent;
}
