import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
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
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
// import { employees } from "./employee";
// import { DataService } from '../data.service';
import { DataService } from '../service/data.service';
import { GridModule } from '@progress/kendo-angular-grid';

import { FormBuilder, FormGroup } from "@angular/forms";


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
  public formGroup!: FormGroup;

 
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('myGrid') myGrid!: KendoGridComponent;

  leadsOptions = ['All Leads', 'My Leads', 'Archived'];
  selectedLead = 'All Leads';
  selectedPreference = 'Select Saved Preferences';
  searchText = '';
  activeView: string = 'non-intl';
  

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
 
  
  public gridView: any[] = [];
 public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public gridData: any[] = [];
  public editedRowIndex: number | null = null;

  constructor(private dataService: DataService, private fb: FormBuilder) {}


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataService.getUsers().subscribe((data) => {
      this.gridData = data;
    });
  }
  createFormGroup(dataItem: any): FormGroup {
    return new FormGroup({
      id: new FormControl(dataItem.id),
      recordId: new FormControl(dataItem.recordId),
      lastName: new FormControl(dataItem.lastName),
      firstName: new FormControl(dataItem.firstName),
      primaryEmail: new FormControl(dataItem.primaryEmail),
      primaryPhoneType: new FormControl(dataItem.primaryPhoneType),
      lmpLeadId: new FormControl(dataItem.lmpLeadId),
      appointmentType: new FormControl(dataItem.appointmentType),
      bookingAgency: new FormControl(dataItem.bookingAgency)
    });
  }
  

   // Add this to get reference to your grid

onCellClick(e: any): void {
  if (this.editedRowIndex !== e.rowIndex) {
    this.saveEdit(); // Save previous edit if any

    this.editedRowIndex = e.rowIndex;
    this.formGroup = this.createFormGroup(e.dataItem);

    // This is the key step that was missing
    this.myGrid.editRow(e.rowIndex, this.formGroup);
  }
}

  onCellClose(e: any): void {
    if (e.formGroup.valid && e.formGroup.dirty) {
      const updatedUser = e.formGroup.value;

      this.dataService.updateUser(updatedUser).subscribe(() => {
        this.gridData[this.editedRowIndex!] = updatedUser;
      });
    }

    this.editedRowIndex = null;
  }

  saveEdit(): void {
    if (this.formGroup && this.formGroup.dirty) {
      const updatedUser = this.formGroup.value;
      console.log('Saving user:', updatedUser); // 👈 DEBUG LOG
      this.dataService.updateUser(updatedUser).subscribe(() => {
        this.gridData[this.editedRowIndex!] = updatedUser;
      });
    }
    this.editedRowIndex = null;
  }
  onCellCancel(e: any): void {
    this.editedRowIndex = null;
  }  
  
 
  
  public onFilter(value: Event): void {
    const inputValue = value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "full_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

 
  
  public exportExcel(): void {
    this.myGrid.saveAsExcel();

}
// addUser(): void {
//   const newUser = {
//     id: null, 
//     name: '',
//     email: '',
//   };

//   this.gridView.unshift(newUser); 
//   this.gridView = [...this.gridView]; 

//   this.editedRowIndex = 0;
//   this.editedItem = { ...newUser };
// }



}

