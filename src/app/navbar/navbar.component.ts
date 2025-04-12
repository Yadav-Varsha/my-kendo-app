// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   imports: [],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {

// }

import { Component, ViewEncapsulation } from "@angular/core";
import { bellIcon, menuIcon, SVGIcon } from "@progress/kendo-svg-icons";

@Component({
  selector: "app-navbar",
  template: `
    <kendo-appbar position="top">
      <kendo-appbar-section>
        <button kendoButton fillMode="flat">
          <kendo-svgicon [icon]="menuIcon"></kendo-svgicon>
        </button>
      </kendo-appbar-section>

      <kendo-appbar-section>
        <h1 class="title">Kendo UI for Angular</h1>
      </kendo-appbar-section>

      <kendo-appbar-spacer width="32px"></kendo-appbar-spacer>

      <kendo-appbar-section>
        <ul>
          <li><span>What's New</span></li>
          <li><span>About</span></li>
          <li><span>Contacts</span></li>
        </ul>
      </kendo-appbar-section>

      <kendo-appbar-spacer></kendo-appbar-spacer>

      <kendo-appbar-section class="actions">
        <kendo-badge-container>
          <button kendoButton fillMode="flat">
            <kendo-svgicon [icon]="bellIcon"></kendo-svgicon>
          </button>
          <kendo-badge
            shape="dot"
            themeColor="warning"
            size="small"
            position="inside"
          ></kendo-badge>
        </kendo-badge-container>
        <span class="k-appbar-separator"></span>
      </kendo-appbar-section>

      <kendo-appbar-section>
        <kendo-avatar
          [imageSrc]="kendokaAvatar"
          shape="circle"
          width="26px"
          height="26px"
        ></kendo-avatar>
      </kendo-appbar-section>
    </kendo-appbar>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      body {
        background: #adadb1;
      }
      .title {
        font-size: 18px;
        margin: 0;
      }
      kendo-badge-container {
        margin-right: 8px;
      }
      ul {
        font-size: 14px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
      }
      li {
        margin: 0 9px;
      }
      li:hover {
        cursor: pointer;
        color: #d6002f;
      }
      .actions .k-button {
        padding: 0;
      }
    `,
  ],
})
export class NavbarComponent {
  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public kendokaAvatar = "assets/navigation/appbar/kendoka-angular.png";
}
