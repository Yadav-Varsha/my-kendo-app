import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';

import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";



import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import {  EmployeeService } from '../service/employee.service';
import { PersistingService  } from '../service/persisting.service';
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
//   public gridSettings: GridSettings = {
//     state: {
//       skip: 0,
//       take: 5,

//       // Initial filter descriptor
//       filter: {
//         logic: "and",
//         filters: [],
//       },
//       group: [],
//     },
//     gridData: process(sampleProducts, {
//       skip: 0,
//       take: 5,
//       // Initial filter descriptor
//       filter: {
//         logic: "and",
//         filters: [],
//       },
//       group: [],
//     }),
//     columnsConfig: [
//       {
//         field: "recordId",
//         title: "Record ID",
//         filterable: false,
//         filter: "numeric",
//         width: 60,
//         hidden: false,
//       },
//       {
//         field: "lastName",
//         title: "Last Name",
//         filterable: true,
//         filter: "text",
//         width: 300,
//         hidden: false,
//       },
//       {
//         field: "firstName",
//         title: "First Name",
//         filter: "text",
//         format: "{0:d}",
//         width: 240,
//         filterable: true,
//         hidden: false,
//       },
//       {
//         field: "primaryEmail",
//         title: "Primary Email",
//         filter: "text",
//         format: "{0:c}",
//         width: 180,
//         filterable: true,
//         hidden: false,
//       },
//       {
//         field: "primaryPhoneType",
//         title: "Primary Phone Type",
//         filter: "numeric",
//         width: 120,
//         filterable: true,
//         hidden: false,
//       },
     
//  {
//         field: "lmpLeadId",
//         title: "LMP Lead ID",
//         filter: "numeric",
//         width: 120,
//         filterable: true,
//         hidden: false,
//       },

//       {
//         field: "bookingAgency",
//         title: "Booking Agency",
//         filter: "text",
//         width: 120,
//         filterable: true,
//         hidden: false,
//       },
//     ],
//   };
 


  public gridData: any[] = [];
  public mySelection: string[] = [];
  public formGroup!: FormGroup;
  private editedRowIndex: number | undefined;
  private isNew: boolean | undefined;

  @ViewChild('myGrid') myGrid!: GridComponent;
  public employees: any[] = [];
  public gridView: any[] = [];
  state: State = {
    skip: 0,
    take: 10,
    sort: [],
    group: [],
    filter: {
      logic: 'and',
      filters: []
    }
  };
  
 
  constructor(private employeeService: EmployeeService, public persistingService: PersistingService) {}

//   public dataStateChange(state: State): void {
//     this.gridSettings.state = state;
//     this.gridSettings.gridData = process(sampleProducts, state);
// }
// public saveGridSettings(grid: GridComponent): void {
//   const columns = grid.columns;

//   //add only the required column properties to save local storage space
//   const gridConfig = {
//       state: this.gridSettings.state,
//       columnsConfig: columns.toArray().map((item) => {
//           return <ColumnSettings>{
//               field: item['field'],
//               width: item['width'],
//               title: item['title'],
//               filter: item['filter'],
//               format: item['format'],
//               filterable: item['filterable'],
//               orderIndex: item['orderIndex']
//           };
//       })
//   };

//   this.persistingService.set('gridSettings', gridConfig);
// }

// public mapGridSettings(gridSettings: GridSettings): GridSettings {
//   const state = gridSettings.state;

//   return {
//       state,
//       columnsConfig: gridSettings.columnsConfig.sort((a, b) => a.orderIndex - b.orderIndex),
//       gridData: process(this.gridData, state)
//   };
// }
  ngOnInit(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.gridData = res;
    });

    this.employeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data;

      // Load from storage if exists
      const saved = this.persistingService.get('gridState');
      if (saved) {
        this.state = saved.state;
        this.gridView = process(this.employees, this.state);
      } else {
        this.gridView = process(this.employees, this.state);
      }
    });
  }
  loadGridData(): void {
    this.employeeService.getAll().subscribe(data => {
      this.gridData = data;
    });

    
  }
  public dataStateChange(state: State): void {
    this.state = state;
    this.gridView = process(this.employees, this.state);
  }

  public saveGridSettings(): void {
    const columns = this.grid.columns.toArray().map(col => ({
      field: col.field,
      title: col.title,
      hidden: col.hidden,
      width: col.width,
      orderIndex: col.orderIndex,
      filter: col.filter,
      filterable: col.filterable,
      format: col.format,
    }));

    this.persistingService.set('gridState', {
      state: this.state,
      columnsConfig: columns,
    });
  }
  public loadGridSettings(): void {
    const saved = this.persistingService.get('gridState');
    if (saved) {
      this.state = saved.state;
      this.grid.columns.reset(saved.columnsConfig); // Optional if you want to restore order/widths
      this.gridView = process(this.employees, this.state);
    }
  }

  public get savedStateExists(): boolean {
    return !!this.persistingService.get('gridState');
  }

  public addHandler(): void {
    this.closeEditor();
    this.formGroup = this.createFormGroup();
    this.isNew = true;
    this.myGrid.addRow(this.formGroup);
  }

  public saveRow(): void {
    debugger
    console.log("testfusdhjf")
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



