import { Component } from '@angular/core'

@Component({
  template: `
    <console-page title="Docs" backLinkPath="/layouts">
      <span class="left align-self-center ml-2">
        <span class="badge badge-warning">Work in Progress</span>
      </span>

      <ui-hero class="grd-kikstart-2 mb-3 mb-md-5" [title]="'Docs Layout'"></ui-hero>
    </console-page>
  `,
})
export class DemoLayoutDocsComponent {}