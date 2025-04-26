import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';


import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";



import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import {  EmployeeService } from '../service/employee.service';
import {
  CellClickEvent,
  DataBindingDirective,
  GridComponent,
  GridModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  GridComponent as KendoGridComponent
} from "@progress/kendo-angular-grid";
import { IconModule } from "@progress/kendo-angular-icons";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
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

  public gridData: any[] = [];
  public mySelection: string[] = [];
  public formGroup!: FormGroup;
  private editedRowIndex: number | undefined;
  private isNew: boolean | undefined;

  @ViewChild('myGrid') myGrid!: GridComponent;

  constructor(private employeeService: EmployeeService) {}



  ngOnInit(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.gridData = res;
    });
  }
  loadGridData(): void {
    this.employeeService.getAll().subscribe(data => {
      this.gridData = data;
    });
  }
  

  public addHandler(): void {
    this.closeEditor();
    this.formGroup = this.createFormGroup();
    this.isNew = true;
    this.myGrid.addRow(this.formGroup);
  }

  public saveRow(): void {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup) {
      const item = this.formGroup.value;
  
      // Ensure it has an 'id' field for editing
      if (!item.id && item.recordId) {
        item.id = item.recordId;
      }
  
      this.employeeService.save(item, this.isNew!).subscribe(() => {
        this.employeeService.getAll().subscribe((res) => {
          this.gridData = res;
          this.closeEditor();
        });
      });
    }
  }
 

  public cellClickHandler({ isEdited, dataItem, rowIndex }: any): void {
    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }

    if (this.isNew) {
      rowIndex += 1;
    }

    this.saveCurrent();

    this.formGroup = this.createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;

    this.myGrid.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler(): void {
    this.closeEditor();
  }

  private closeEditor(): void {
    this.myGrid.closeRow(this.editedRowIndex);
    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined!;
  }
  private createFormGroup(dataItem?: any): FormGroup {
    return new FormGroup({
      id: new FormControl(dataItem?.id), // added
      recordId: new FormControl(dataItem?.recordId || 0, Validators.required),
      lastName: new FormControl(dataItem?.lastName || '', Validators.required),
      firstName: new FormControl(dataItem?.firstName || '', Validators.required),
      primaryEmail: new FormControl(dataItem?.primaryEmail || '', Validators.required),
      primaryPhoneType: new FormControl(dataItem?.primaryPhoneType || '', Validators.required),
      lmpLeadId: new FormControl(dataItem?.lmpLeadId || 0, Validators.required),
      appointmentType: new FormControl(dataItem?.appointmentType || '', Validators.required),
      bookingAgency: new FormControl(dataItem?.bookingAgency || '', Validators.required),
    });
  }
  // private createFormGroup(dataItem?: any): FormGroup {
  //   return new FormGroup({
  //     recordId: new FormControl(dataItem?.recordId || 0, Validators.required),
  //     lastName: new FormControl(dataItem?.lastName || '', Validators.required),
  //     firstName: new FormControl(dataItem?.firstName || '', Validators.required),
  //     primaryEmail: new FormControl(dataItem?.primaryEmail || '', Validators.required),
  //     primaryPhoneType: new FormControl(dataItem?.primaryPhoneType || '', Validators.required),
  //     lmpLeadId: new FormControl(dataItem?.lmpLeadId || 0, Validators.required),
  //     appointmentType: new FormControl(dataItem?.appointmentType || '', Validators.required),
  //     bookingAgency: new FormControl(dataItem?.bookingAgency || '', Validators.required),
  //   });
  // }
 
//   public gridData: any[] = [];
 
//   public gridView: any[] = [];
//  public mySelection: string[] = [];
 
 


//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
 
//   @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
//   @ViewChild('myGrid') myGrid!: KendoGridComponent;
//   public formGroup!: FormGroup;
//   private editedRowIndex: number | undefined;
//   private isNew: boolean | undefined;
//   constructor(public employeeService: EmployeeService) {}

//   public addHandler(): void {
//     this.closeEditor();

//     this.formGroup = createFormGroup({
//       Discontinued: false,
//       ProductName: "",
//       UnitPrice: 0,
//       UnitsInStock: "",
//     });
//     this.isNew = true;

//     this.grid.addRow(this.formGroup);
//   }
//   public saveRow(): void {
//     if (this.formGroup && this.formGroup.valid) {
//       this.saveCurrent();
//     }
//   }
//   private saveCurrent(): void {
//     if (this.formGroup) {
//       this.service.save(this.formGroup.value, this.isNew);
//       this.closeEditor();
//     }
//   }
//   public cellClickHandler({
//     isEdited,
//     dataItem,
//     rowIndex,
//   }: CellClickEvent): void {
//     if (isEdited || (this.formGroup && !this.formGroup.valid)) {
//       return;
//     }

//     if (this.isNew) {
//       rowIndex += 1;
//     }

//     this.saveCurrent();

//     this.formGroup = createFormGroup(dataItem);
//     this.editedRowIndex = rowIndex;

//     this.grid.editRow(rowIndex, this.formGroup);
//   }

//   public cancelHandler(): void {
//     this.closeEditor();
//   }

//   private closeEditor(): void {
//     this.grid.closeRow(this.editedRowIndex);

//     this.isNew = false;
//     this.editedRowIndex = undefined;
//     this.formGroup = undefined;
//   }

}



