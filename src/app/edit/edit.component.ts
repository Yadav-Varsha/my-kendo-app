1import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';

import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import {  EmployeeService } from '../service/employee.service';
import { PersistingService  } from '../service/persisting.service';
import { ColumnSettings } from "./column-settings.interface";
import { GridSettings } from "./grid-settings.interface";
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
      FormsModule,DropDownsModule,IconModule,GridModule, ReactiveFormsModule ],
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
  public stateName: string = '';
 
public selectedState: string = '';
public savedStateNames: string[] = [];
public selectedStateName: string = '';
public newStateName: string = '';


  @ViewChild('myGrid') myGrid!: GridComponent;
  public employees: any[] = [];
  public gridView: any[] = [];
 
  public gridSettings: any = {
    state: {
      skip: 0,
      take: 5,
      filter: { logic: 'and', filters: [] },
      group: [],
      sort: []
    },
 
    gridData: [],  // Initialize with an empty array for the data
    columnsConfig: [
            {
              field: "recordId",
              title: "Record ID",
              filterable: false,
              filter: "numeric",
              width: 60,
              hidden: false,
            },
            {
              field: "lastName",
              title: "Last Name",
              filterable: true,
              filter: "text",
              width: 300,
              hidden: false,
              sort: null 
            },
            {
              field: "firstName",
              title: "First Name",
              filter: "text",
              // format: "{0:d}",
              width: 240,
              filterable: true,
              hidden: false,
              sort: null
            },
            {
              field: "primaryEmail",
              title: "Primary Email",
              filter: "text",
              // format: "{0:c}",
              width: 180,
              filterable: true,
              hidden: false,
              sort: null
            },
            {
              field: "primaryPhoneType",
              title: "Primary Phone Type",
              filter: "numeric",
              width: 120,
              filterable: true,
              hidden: false,
              sort: null
            },
           
       {
              field: "lmpLeadId",
              title: "LMP Lead ID",
              filter: "numeric",
              width: 120,
              filterable: true,
              hidden: false,
              sort: null
            },
      
            {
              field: "bookingAgency",
              title: "Booking Agency",
              filter: "text",
              width: 120,
              filterable: true,
              hidden: false,
              sort: null
            },
          ],
  
  };
 
  constructor(private employeeService: EmployeeService, public persistingService: PersistingService) {
    const gridSettings = this.persistingService.get('gridSettings');
    if (gridSettings) {
      this.gridSettings = this.mapGridSettings(gridSettings);
    }
  }
  public get savedStateExists(): boolean {
    return !!this.persistingService.get("gridSettings");
  }
  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => {
      this.gridSettings.gridData = process(data, this.gridSettings.state);
    });
    this.loadSavedStateNames();
   

  
   }


loadGridData(): void {
  this.employeeService.getAll().subscribe(data => {
    this.gridData = data;
  });
}

public dataStateChange(state: State): void {
  this.gridSettings.state = state;
  this.persistingService.set('gridSettings', {
    state: this.gridSettings.state,
    columnsConfig: this.gridSettings.columnsConfig,
  });

  this.employeeService.getAll().subscribe(data => {
    this.gridSettings.gridData = process(data, state);
  });
}


// public saveGridSettings(grid: GridComponent): void {
//   const columns = grid.columns;
//   const gridConfig = {
//     state: this.gridSettings.state,
//     columnsConfig: columns.toArray().map((col: any) => ({
//       field: col['field'],
//       title: col['title'],
//       width: col['width'],
//       filter: col['filter'],
//       format: col['format'],
//       filterable: col['filterable'],
//       hidden: col['hidden'],
//     })),
//   };
//   this.persistingService.set('gridSettings', gridConfig);
// }
  

// public loadSavedState(grid: GridComponent): void {
//   const savedSettings = this.persistingService.get('gridSettings');
//   if (savedSettings) {
//     this.gridSettings = this.mapGridSettings(savedSettings);

//     // ✅ Re-fetch and apply the state to grid data
//     this.employeeService.getAll().subscribe(data => {
//       this.gridSettings.gridData = process(data, this.gridSettings.state);
//     });
//   }
// }
public saveGridStateAs(grid: GridComponent, stateName: string): void {
  if (!stateName.trim()) {
    alert('Please enter a name for the state.');
    return;
  }

  const columns = grid.columns.toArray().map((col: any) => ({
    field: col.field,
    title: col.title,
    width: col.width,
    filter: col.filter,
    format: col.format,
    filterable: col.filterable,
    hidden: col.hidden,
    sort: col.sort
  }));

  const savedStates = this.persistingService.get('namedGridStates') || {};

  savedStates[stateName] = {
    state: this.gridSettings.state,
    columnsConfig: columns
  };

  this.persistingService.set('namedGridStates', savedStates);
  this.loadSavedStateNames();
  alert(`Grid state "${stateName}" saved successfully.`);
}




public loadSelectedGridState(grid: GridComponent, stateName: string): void {
  if (!stateName) return;

  const savedStates = this.persistingService.get('namedGridStates');
  if (savedStates && savedStates[stateName]) {
    this.gridSettings.state = savedStates[stateName].state;
    this.gridSettings.columnsConfig = savedStates[stateName].columnsConfig;

   // Apply column visibility and sort order
   grid.columns.toArray().forEach((col: any) => {
    const savedColumn = this.gridSettings.columnsConfig.find((c: any) => c.field === col.field);
    if (savedColumn) {
      col.hidden = savedColumn.hidden;
      col.sort = savedColumn.sort;
    }
  });

 

    this.employeeService.getAll().subscribe(data => {
      this.gridSettings.gridData = process(data, this.gridSettings.state);
    });
  }
}



public loadSavedStateNames(): void {
  const savedStates = this.persistingService.get('namedGridStates') || {};
  this.savedStateNames = Object.keys(savedStates);
}

private mapGridSettings(settings: any): GridSettings {
  return {
    state: settings.state,
    gridData: [],
    columnsConfig: settings.columnsConfig || []
  };
}
private mapDateFilter = (descriptor: any) => {
  const filters = descriptor.filters || [];
  filters.forEach((filter: any) => {
    if (filter.filters) {
      this.mapDateFilter(filter);
    } else if (filter.field === 'DateOfJoining' && filter.value) {
      filter.value = new Date(filter.value);
    }
  });
};
trackColumn(index: number, item: any): any {
  return item.field;
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

 }



