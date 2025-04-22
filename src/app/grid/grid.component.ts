import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
import { images } from "./images";

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
    FormsModule,DropDownsModule,IconModule,
    
   
  ],
   templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  
 
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
  public editedRowIndex: number | null = null;
public editedItem: any;

  public gridData: any[] = [];
  public gridView: any[] = [];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;

  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data: any) => {
      this.gridData = data;
      this.gridView = data;
    });
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

  public photoURL(dataItem: { img_id: string; gender: string }): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }
  
  public exportExcel(): void {
    this.myGrid.saveAsExcel();

}
onEdit(dataItem: any, rowIndex: number): void {
  this.editedRowIndex = rowIndex;
  this.editedItem = { ...dataItem };
}

cancelEdit(): void {
  this.editedRowIndex = null;
  this.editedItem = null;
}

saveEdit(rowIndex: number): void {
  const updatedItem = { ...this.gridView[rowIndex], ...this.editedItem };

  this.dataService.updateUser(updatedItem).subscribe(() => {
    this.gridView[rowIndex] = updatedItem;
    this.editedRowIndex = null;
    this.editedItem = null;
  });
}




onDelete(dataItem: any): void {
  console.log('Delete:', dataItem);
}



}
