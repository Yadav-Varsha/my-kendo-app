// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-mainpage',
//   imports: [],
//   templateUrl: './mainpage.component.html',
//   styleUrl: './mainpage.component.css'
// })
// export class MainpageComponent {

// }
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { KENDO_CHARTS } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import {
  DataBindingDirective,
  GridComponent,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from '@progress/kendo-angular-grid';

import { formatDate } from '@angular/common';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconModule } from '@progress/kendo-angular-icons';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { process, State } from '@progress/kendo-data-query';
import { fileExcelIcon, filePdfIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { EmployeeService } from '../service/employee.service';
import { PersistingService } from '../service/persisting.service';
import { TheamService } from '../service/theam.service';
@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [
    CommonModule,
    KENDO_GRID,
    KENDO_CHARTS,
    KENDO_INPUTS,
    KENDO_GRID_PDF_EXPORT,
    KENDO_GRID_EXCEL_EXPORT,
    FormsModule,
    DropDownsModule,
    IconModule,
    GridModule,
    ReactiveFormsModule,
    NgbDropdownModule, DateInputsModule
  ],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent implements OnInit {
  leadsOptions = ['All Leads', 'My Leads', 'Archived'];
  selectedLead = 'All Leads';
  // selectedPreference = 'Select Saved Preferences';
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
  public stateName: string = '';
  public selectedState: string = '';
  public savedStateNames: string[] = [];
  public selectedStateName: string = '';
  public newStateName: string = '';
  public originalData: any[] = [...this.gridData]; // store full data once on init/load
  public createdSourceFilterValue: any = null;

public createdSourceFilterOptions = [
  { text: 'Mobile', value: 'Mobile' },
  { text: 'Website', value: 'Website' }
];
 
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('myGrid') myGrid!: GridComponent;
  public gridSettings: any = {
    state: {
      skip: 0,
      take: 5,
      filter: { logic: 'and', filters: [] },
      group: [],
      sort: [],
    },
    gridData: process(this.gridData, {
      skip: 0,
      take: 5,
      filter: { logic: 'and', filters: [] },
      group: [],
      sort: [],
    }),
    // gridData: [],  // Initialize with an empty array for the data
    columnsConfig: [
      {
        field: 'recordId',
        title: 'Record ID',
        filterable: false,
        filter: 'numeric',
        width: 60,
        hidden: false,
      },
      {
        field: 'lastName',
        title: 'Last Name',
        filterable: true,
        filter: 'text',
        width: 300,
        hidden: false,
        sort: null,
      },
      {
        field: 'firstName',
        title: 'First Name',
        filter: 'text',
        // format: "{0:d}",
        width: 240,
        filterable: true,
        hidden: false,
        sort: null,
      },
      {
        field: 'primaryEmail',
        title: 'Primary Email',
        filter: 'text',
        // format: "{0:c}",
        width: 180,
        filterable: true,
        hidden: false,
        sort: null,
      },
      {
        field: 'primaryPhoneType',
        title: 'Primary Phone Type',
        filter: 'numeric',
        width: 120,
        filterable: true,
        hidden: false,
        sort: null,
      },

      {
        field: 'lmpLeadId',
        title: 'LMP Lead ID',
        filter: 'numeric',
        width: 120,
        filterable: true,
        hidden: false,
        sort: null,
      },

      {
        field: 'bookingAgency',
        title: 'Booking Agency',
        filter: 'text',
        width: 120,
        filterable: true,
        hidden: false,
        sort: null,
      },
      
      {
        field: 'leadStatus',
        title: 'Lead Status',
        filter: 'text',
        width: 120,
        filterable: true,
        hidden: false,
        sort: null,
      },
      {
        field:'createdSource',
        title:'Created Source',
         filter: 'text',
        width: 120,
        filterable: true,
        hidden: false,
        sort: null,
      },
      {
        field: 'assignedDate',
        title: 'Assigned Date',
        filter: 'date',
        format: '{0:d}',
        filterable: true,
        hidden: false,
      },
    ],
  };
  columns: any;

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

  constructor(
    public theamService: TheamService,
    private employeeService: EmployeeService,
    public persistingService: PersistingService
  ) {
    const gridSettings = this.persistingService.get('gridSettings');
    if (gridSettings) {
      this.gridSettings = this.mapGridSettings(gridSettings);
    }
  }
  public get savedStateExists(): boolean {
    return !!this.persistingService.get('gridSettings');
  }
  // Call toggleTheme from the service
  //  toggleTheme(): void {
  //   this.theamService.toggleTheme();
  // }

  ngOnInit(): void {
   
    this.employeeService.getAll().subscribe((data) => {
      // this.originalData = data;
      this.gridData = data;
      this.gridSettings.gridData = process(data, this.gridSettings.state);
      console.log('Processed grid data:', this.gridSettings.gridData);

      console.log('Fetched data:', data); // <-- Add this to confirm it's coming
    });

    this.loadSavedStateNames();
    this.theamService.applySavedTheme();
  }

  loadGridData(): void {
    ;
    this.employeeService.getAll().subscribe((data) => {
      this.originalData = data; //  also store here if used for reload
      this.gridSettings.gridData = process(data, this.gridSettings.state);
    });
  }

  public dataStateChange(state: State): void {
    this.gridSettings.state = state;
    this.persistingService.set('gridSettings', {
      state: this.gridSettings.state,
      columnsConfig: this.gridSettings.columnsConfig,
    });

    this.employeeService.getAll().subscribe((data) => {
      this.gridSettings.gridData = process(data, state);
      console.log('Grid data after state change:', this.gridSettings.gridData);
    });
  }
  public saveGridStateAs(grid: GridComponent): void {
    const stateName = prompt('Enter a name for the state:');

    if (!stateName || !stateName.trim()) {
      alert('Please enter a name for the state.');
      return;
    }


    const columns = grid.columns.toArray().map((item: { orderIndex: any }) => ({
      field: (item as any).field,
      width: (item as any).width,
      title: (item as any).title,
      filter: (item as any).filter,
      format: (item as any).format,
      filterable: (item as any).filterable,
      orderIndex: item.orderIndex,
      hidden: (item as any).hidden,
      sort: (item as any).sort,
    }));

    const savedStates = this.persistingService.get('namedGridStates') || {};

    savedStates[stateName] = {
      state: this.gridSettings.state,
      columnsConfig: columns,
    };
    console.log('Saved states:', savedStates);
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
        const savedColumn = this.gridSettings.columnsConfig.find(
          (c: any) => c.field === col.field
        );
        if (savedColumn) {
          col.hidden = savedColumn.hidden;
          col.sort = savedColumn.sort;
          col.orderIndex = (savedColumn as any).orderIndex;
        }
      });

      this.employeeService.getAll().subscribe((data) => {
        this.gridSettings.gridData = process(data, this.gridSettings.state);
      });
    }
  }

  public loadSavedStateNames(): void {
    const savedStates = this.persistingService.get('namedGridStates') || {};
    this.savedStateNames = Object.keys(savedStates);
  }

  deleteState(event: MouseEvent, stateName: string): void {
    event.stopPropagation(); // Prevent the dropdown from selecting the item
    const index = this.savedStateNames.indexOf(stateName);
    if (index !== -1) {
      this.savedStateNames.splice(index, 1);
      localStorage.removeItem(`grid-state-${stateName}`);
      // Optional: Clear selection if deleted
      if (this.selectedState === stateName) {
        this.selectedState = '';
      }
    }
  }

  private mapGridSettings(savedSettings: any): any {
    const state = savedSettings.state;
    this.mapDateFilter(state.filter);

    return {
      state,
      columnsConfig: savedSettings.columnsConfig.sort(
        (a: any, b: any) => a.orderIndex - b.orderIndex
      ),
      gridData: process(this.gridData, state), // Placeholder for now
    };
  }

  private mapDateFilter = (descriptor: any) => {
    if (!descriptor || !descriptor.filters) {
      return; // Exit early if descriptor or filters are null
    }

    const filters = descriptor.filters;
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

  public clearFilters(): void {
    window.location.reload();
  }

  toggleTheme() {
    this.theamService.toggleTheme();
  }

  public addHandler(): void {
    this.closeEditor();
    this.formGroup = this.createFormGroup();
    this.isNew = true;
    this.myGrid.addRow(this.formGroup);
  }

  saveRow(event: any): void {
    const dataItem = event.dataItem;

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

       // Format assignedDate to 'MM-dd-yyyy' before saving
    if (item.assignedDate) {
      item.assignedDate = formatDate(item.assignedDate, 'MM-dd-yyyy', 'en-US');
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
      firstName: new FormControl(
        dataItem?.firstName || '',
        Validators.required
      ),
      primaryEmail: new FormControl(
        dataItem?.primaryEmail || '',
        Validators.required
      ),
      primaryPhoneType: new FormControl(
        dataItem?.primaryPhoneType || '',
        Validators.required
      ),
      lmpLeadId: new FormControl(dataItem?.lmpLeadId || 0, Validators.required),
      appointmentType: new FormControl(
        dataItem?.appointmentType || '',
        Validators.required
      ),
      bookingAgency: new FormControl(
        dataItem?.bookingAgency || '',
        Validators.required
      ),

    leadStatus: new FormControl(dataItem?.leadStatus || '', Validators.required),
    createdSource: new FormControl(dataItem?.createdSource || '', Validators.required),
     assignedDate: new FormControl(dataItem?.assignedDate ? new Date(dataItem.assignedDate) : null,Validators.required
)
});
  }
  public onFilter(value: string): void {
    const inputValue = value.toLowerCase(); // small/capital ka problem na ho

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lastName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'firstName',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    // this.gridSettings.state.skip = 0;
    this.dataBinding.skip = 0;
  }
  // public onFilter(value: string): void {
  //   const inputValue = value.toLowerCase();

  //   const filteredData = process(this.gridSettings.gridData, {
  //     filter: {
  //       logic: "or",
  //       filters: [
  //         { field: "lastName", operator: "contains", value: inputValue },
  //         { field: "firstName", operator: "contains", value: inputValue },
  //       ],
  //     },
  //   });

  //   this.gridSettings.gridData = filteredData.data;
  //   this.gridSettings.state.skip = 0;
  // }

  toggleView(view: string): void {
    this.activeView = view;
  }

  public selectedAction: string = 'Action';

  public exportExcel(): void {
    this.myGrid.saveAsExcel();
  }

  public leadStatusOptions: string[] = [
    'New',
    'In Progress',
    'Qualified',
    'Disqualified',
    'Converted',
  ];


// public createdSourceFilter = {
//   ui: (filterArgs: FilterCellTemplateDirective) =>  {
//     return {
//       componentType: 'dropdown',
//       data: this.createdSources,
//       valueField: 'value',
//       textField: 'text'
//     };
//   }
// };
onCreatedSourceFilterChange(value: any): void {
  const filters = [];

  if (value) {
    filters.push({
      field: 'createdSource',
      operator: 'eq',
      value: value
    });
  }

  // Combine with any other existing filters
  const existingFilters = this.gridSettings.state.filter?.filters || [];
  const otherFilters = existingFilters.filter((f: any) => f.field !== 'createdSource');

  const newFilters = [...otherFilters, ...filters];

  this.gridSettings.state.filter = {
    logic: 'and',
    filters: newFilters
  };

  this.gridSettings.gridData = process(this.gridData, this.gridSettings.state);
}

}
