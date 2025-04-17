import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import {
  DataBindingDirective,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
import { employees } from "./employee";
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
  ],
   templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: unknown[] = employees;
  public gridView!: unknown[];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;

  public ngOnInit(): void {
    this.gridView = this.gridData;
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
}
