// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-button',
//   imports: [],
//   templateUrl: './button.component.html',
//   styleUrl: './button.component.css'
// })
// export class ButtonComponent {

// }

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { FormsModule } from "@angular/forms";
import { SVGIcon, folderIcon } from "@progress/kendo-svg-icons";

@Component({
  selector: "my-button",
  standalone: true,
  imports: [CommonModule, FormsModule, KENDO_BUTTONS],
  styles: [
    `
      .k-button {
        margin: 5px;
      }
    `,
  ],
  template: `
    <div class="row example-wrapper">
      <div class="col-xs-12 col-sm-6 example-col">
        <p>Default Buttons</p>
        <p>
          <button kendoButton (click)="onButtonClick()">Browse</button>
          <button kendoButton (click)="onButtonClick()" [svgIcon]="folderSVG">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            title="Browse"
          ></button>
        </p>
        <p>
          <button kendoButton (click)="onButtonClick()" [disabled]="true">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            title="Browse"
            [disabled]="true"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Default Buttons (Primary)</p>
        <p>
          <button kendoButton (click)="onButtonClick()" themeColor="primary">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            title="Browse"
            themeColor="primary"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            title="Browse"
            [disabled]="true"
            themeColor="primary"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Flat Buttons</p>
        <p>
          <button kendoButton (click)="onButtonClick()" fillMode="flat">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            title="Browse"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="flat"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            title="Browse"
            [disabled]="true"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Flat Buttons (Primary)</p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="flat"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            title="Browse"
            themeColor="primary"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="flat"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="flat"
            title="Browse"
            [disabled]="true"
            themeColor="primary"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Outline Buttons</p>
        <p>
          <button kendoButton (click)="onButtonClick()" fillMode="outline">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            title="Browse"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="outline"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            title="Browse"
            [disabled]="true"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Outline Buttons (Primary)</p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="outline"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            title="Browse"
            themeColor="primary"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="outline"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="outline"
            title="Browse"
            [disabled]="true"
            themeColor="primary"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Link Buttons</p>
        <p>
          <button kendoButton (click)="onButtonClick()" fillMode="link">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            title="Browse"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="link"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            title="Browse"
            [disabled]="true"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Link Buttons (Primary)</p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="link"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            title="Browse"
            themeColor="primary"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="link"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="link"
            title="Browse"
            [disabled]="true"
            themeColor="primary"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Clear Buttons</p>
        <p>
          <button kendoButton (click)="onButtonClick()" fillMode="clear">
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            title="Browse"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="clear"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            [disabled]="true"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            title="Browse"
            [disabled]="true"
          ></button>
        </p>
      </div>

      <div class="col-xs-12 col-sm-6 example-col">
        <p>Clear Buttons (Primary)</p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="clear"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            title="Browse"
            themeColor="primary"
          ></button>
        </p>
        <p>
          <button
            kendoButton
            (click)="onButtonClick()"
            fillMode="clear"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            [disabled]="true"
            themeColor="primary"
          >
            Browse
          </button>
          <button
            kendoButton
            (click)="onButtonClick()"
            [svgIcon]="folderSVG"
            fillMode="clear"
            title="Browse"
            [disabled]="true"
            themeColor="primary"
          ></button>
        </p>
      </div>
    </div>
  `,
})
export class ButtonComponent {
  public folderSVG: SVGIcon = folderIcon;
  public onButtonClick(): void {
    console.log("click");
  }
}

