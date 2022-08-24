import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ReportingController} from "./reporting.controller";

@Module({
  imports: [],
  controllers: [AppController, ReportingController],
  providers: [AppService],
})
export class AppModule {}
