import {Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'reporting-api-root',
  template: `
    <div class="content">
      <div class="modes">
        tu będa przełączniki
      </div>
      <div class="iframe-container">
        <iframe [src]="iframeSrc"></iframe>
      </div>
      <div class="console-container">
        <div class="console-label">
          Requesty do servera:
        </div>
        <div class="console">

        </div>
      </div>

    </div>

  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  _iframeSrc = 'api/csp-script-src.html'

  constructor(private sanitizer: DomSanitizer) {
  }

  get iframeSrc() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this._iframeSrc);
  }
}
