import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormsModule, Validators } from "@angular/forms";
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
import {
  
  CellClickEvent,
  CellCloseEvent,
  AddEvent,
  CancelEvent,
  SaveEvent,
  RemoveEvent,
  GridDataResult
} from '@progress/kendo-angular-grid';
import { IconModule } from "@progress/kendo-angular-icons";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { process, State } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
// import { employees } from "./employee";
// import { DataService } from '../data.service';
import { DataService } from '../service/data.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup,Validator } from "@angular/forms";


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
  public view: Observable<GridDataResult> | undefined;
  public gridState: State = { skip: 0, take: 5 };
  private cellClickEvent!: CellClickEvent;

  public changes = {};

  

 
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('myGrid') myGrid!: KendoGridComponent;

  leadsOptions = ['All Leads', 'My Leads', 'Archived'];
  selectedLead = 'All Leads';
  selectedPreference = 'Select Saved Preferences';
  searchText = '';
  activeView: string = 'non-intl';
  grid: any;
hasChanges: any;
  

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
 
 
  constructor(public dataService: DataService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.dataService.subscribe(data => {
      this.gridData = data;
    });
    this.dataService.read(); // Fetch the data
  }

  onStateChange(state: State): void {
    this.gridState = state;
    this.dataService.read();
  }

  // cellClickHandler(args: CellClickEvent): void {
  //   this.cellClickEvent = args;
  // }
  cellClickHandler(args: any): void {
    this.cellClickEvent = args;
  }
  // onDblClick(): void {
  //   const args = this.cellClickEvent;
  //   if (!args.isEdited) {
  //     args.sender.editCell(
  //       args.rowIndex,
  //       args.columnIndex,
  //       this.createFormGroup(args.dataItem)
  //     );
  //   }
  // }
  onDblClick(): void {
    const args = this.cellClickEvent;
    if (!args.isEdited) {
      args.sender.editCell(
        args.rowIndex,
        args.columnIndex,
        this.createFormGroup(args.dataItem)
      );
    }
  }
  cellCloseHandler(args: CellCloseEvent): void {
    if (!args.formGroup.valid) {
      args.preventDefault();
    } else if (args.formGroup.dirty) {
      this.dataService.assignValues(args.dataItem, args.formGroup.value);
      this.dataService.update(args.dataItem);
    }
  }

  addHandler(args: AddEvent): void {
    args.sender.addRow(this.createFormGroup({}));
  }

  cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }

  saveHandler(args: SaveEvent): void {
    if (args.formGroup.valid) {
      this.dataService.create(args.formGroup.value);
      args.sender.closeRow(args.rowIndex);
    }
  }

  removeHandler(args: RemoveEvent): void {
    this.dataService.remove(args.dataItem);
  }

  createFormGroup(data: any): FormGroup {
    return this.fb.group({
      id: data.id,
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      gender: [data.gender, Validators.required],
      status: [data.status, Validators.required],
    });
  }
  public saveChanges(): void {
    if (this.grid) {
      this.grid.closeCell();
      this.grid.cancelCell();
    }
    this.dataService.saveChanges();
  }

  public cancelChanges(): void {
    if (this.grid) {
      this.grid.cancelCell();
    }
    this.dataService.cancelChanges();
  }

  

   
  
  
  // public createFormGroup(dataItem: any): FormGroup {
  //   return new FormGroup({
  //     id: new FormControl(dataItem.id),
  //     firstName: new FormControl(dataItem.firstName, Validators.required),
  //     lastName: new FormControl(dataItem.lastName, Validators.required),
  //     email: new FormControl(dataItem.email, [Validators.required, Validators.email])
  //   });
  // }
  
  
  

   // Add this to get reference to your grid

  //  onCellClick(e: any): void {
  //   if (this.editedRowIndex !== e.rowIndex) {
  //     this.saveEdit();  // optional
  //     this.formGroup = this.createFormGroup(e.dataItem);
  //     this.myGrid.editRow(e.rowIndex, this.formGroup); // very important
  //     this.editedRowIndex = e.rowIndex;
  //   }
  //   console.log(this.formGroup)
  // }
  // onCellEdit(event: any): void {
  //   // Optionally handle when the cell enters edit mode
  //   console.log("Cell Edit: ", event);
  // }
  
  // onCellClose(event: any): void {
  //   if (event.formGroup.valid) {
  //     // Save the updated data
  //     const updatedItem = event.formGroup.value;
  //     // Implement save logic (e.g., send the updated data to an API)
  //     console.log("Data Saved: ", updatedItem);
  //   } else {
  //     console.log("Form invalid, canceling edit.");
  //   }
  // }
  
  
  // onCellClose(e: any): void {
  //   if (e.formGroup?.valid && e.formGroup?.dirty) {
  //     const updatedUser = e.formGroup.value;
  
  //     console.log('Saving user:', updatedUser); // ✅ Add this to debug
     
  //     this.dataService.updateUser(updatedUser).subscribe(() => {
  //       this.gridData[this.editedRowIndex!] = updatedUser;
  //     });
  //   }
  
  //   this.editedRowIndex = null;
  //   console.log(e.formGroup.value)
  // }
 
  

  // saveEdit(): void {
  //   if (this.formGroup && this.formGroup.dirty) {
  //     const updatedUser = this.formGroup.value;
  //     console.log('Saving user:', updatedUser); // 👈 DEBUG LOG
  //     this.dataService.updateUser(updatedUser).subscribe(() => {
  //       this.gridData[this.editedRowIndex!] = updatedUser;
  //     });
  //   }
  //   this.editedRowIndex = null;
  // }
  // onCellCancel(e: any): void {
  //   this.editedRowIndex = null;
  // }  
  
 
  
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

