import {Body, Controller, Post} from "@nestjs/common";

@Controller()
export class ReportingController {

  @Post('reporting')
  handleReport(@Body() body: any ): void {
    console.log(`body: ${body}`);
  }

}
