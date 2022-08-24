import {Controller, Get, Header} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('csp-script-src.html')
  @Header('Content-type', 'text/html')
  @Header('Reporting-Endpoints', `main-endpoint="http://localhost:4200/api/reporting", default="http://localhost:4200/api/reporting"`)
  @Header('Content-Security-Policy', `script-src 'self' 'unsafe-inline' http://cdnjs.cloudflare.com; report-to main-endpoint;`)
  getData(): string {
    return this.siteContent(`<script src="https://brute-force.pl/some-script.js"></script>`, {
      'Content-Security-Policy':`script-src 'self' 'unsafe-inline' http://cdnjs.cloudflare.com;`,
      'Reporting-Endpoints': 'main-endpoint="http://localhost:4200/api/reporting"'
    });
  }


  private siteContent(contentToShow: string, headers: any): string {
    return `<html>
      <body>
        ${this.style()}
        ${contentToShow}
      <div>Nagłówki:</div>
      <pre><code class="language-html">${this.headers(headers)}</code></pre>
      <div>Wewnątrz body mamy:</div>
      <pre><code class="language-html">${contentToShow.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")}</code></pre>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css">
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
      <script>hljs.highlightAll();</script>
      </body>
      </html>
        `;
  }

  private headers(map: any) {
    let result: string[] = [];
    Object.entries(map).forEach(([key, value], index) => {
      result.push(`${key}: ${value}`);
    });
    return result.join("\n");
  }

  private style(): string {
    return `
    <style>
    body,
    html {
      margin: 0;
      padding: 0;
      background-color: black;
      color: #eee;
      height: 100%;
    }
    </style>
    `;
  }
}
