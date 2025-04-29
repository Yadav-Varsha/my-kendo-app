import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormsModule, Validators,FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { KENDO_CHARTS, } from "@progress/kendo-angular-charts";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import {
  DataBindingDirective,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  GridComponent as KendoGridComponent
} from "@progress/kendo-angular-grid";

import { IconModule } from "@progress/kendo-angular-icons";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { process, State } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
import {  EmployeeService } from '../service/employee.service';
import { TheamService } from '../service/theam.service';
import { GridModule } from '@progress/kendo-angular-grid';




@Component({
  selector: "app-grid",
  standalone: true,
  imports: [
    CommonModule,
    KENDO_GRID,
    KENDO_CHARTS,
    KENDO_INPUTS,
    KENDO_GRID_PDF_EXPORT,
    KENDO_GRID_EXCEL_EXPORT,
    FormsModule,DropDownsModule,IconModule,GridModule, ReactiveFormsModule, 
   ],
   templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
 
  leadsOptions = ['All Leads', 'My Leads', 'Archived'];
  selectedLead = 'All Leads';
  selectedPreference = 'Select Saved Preferences';
  searchText = '';
  activeView: string = 'non-intl';

  public gridData: any[] = [];
  public mySelection: string[] = [];
  public formGroup!: FormGroup;
  public editedRowIndex: number | undefined;
  private isNew: boolean | undefined;
 public gridView: any[] = [];
 public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
 
  

 
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('myGrid') myGrid!: KendoGridComponent;
dataItem: any;



  // leadsOptions = ['All Leads', 'My Leads', 'Archived'];
  // selectedLead = 'All Leads';
  // selectedPreference = 'Select Saved Preferences';
  // searchText = '';
  // activeView: string = 'non-intl';
 

// toggleView(view: string): void {
//   this.activeView = view;
// }

// public selectedAction: string = 'Action';

// public areaList: Array<string> = [
// "Edit",
// "Delete", 
// "View",
// ];


  
//   public someList: Array<string> = [
//     "avg smf",
//     "canada",
//     "App.setter",
//     "Canada Filter",
//     "Interstate",
//     "lostvswon",
//     "Shipper Type-National Account",
  
//   ];
 
  
//   public gridView: any[] = [];
//  public mySelection: string[] = [];
//   public pdfSVG: SVGIcon = filePdfIcon;
//   public excelSVG: SVGIcon = fileExcelIcon;
//   public gridData: any[] = [];
 
 
constructor(public theamService: TheamService,private employeeService: EmployeeService)  {}
 // Call toggleTheme from the service
//  toggleTheme(): void {
//   this.theamService.toggleTheme();
// }
toggleTheme() {
  this.theamService.toggleTheme();
}


  ngOnInit(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.gridData = res;
    });
    this.theamService.applySavedTheme();
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

  public saveRow(dataItem:any): void {
    debugger
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup) {
      const item = this.formGroup.value;
  
      if (!item.id && item.recordId) {
        item.id = item.recordId;
      }
  
      // CLOSE editor immediately before API
      this.closeEditor();
  
      // NOW call API safely
      this.employeeService.save(item, this.isNew!).subscribe(() => {
        this.employeeService.getAll().subscribe((res) => {
          this.gridData = res;
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
   public onFilter(value: string): void {
    const inputValue = value.toLowerCase();  // small/capital ka problem na ho
  
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "lastName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "firstName",
            operator: "contains",
            value: inputValue,
          },
     
        ],
      },
    }).data;
  
    this.dataBinding.skip = 0;
  }

  toggleView(view: string): void {
    this.activeView = view;
  }
  
  public selectedAction: string = 'Action';
  
  public areaList: Array<string> = [
  "Edit",
  "Delete", 
  "View",
  ];
  
  
    
    public someList: Array<string> = [
      "avg smf",
      "canada",
      "App.setter",
      "Canada Filter",
      "Interstate",
      "lostvswon",
      "Shipper Type-National Account",
    
    ];
   
  
  public exportExcel(): void {
    this.myGrid.saveAsExcel();

}


}

