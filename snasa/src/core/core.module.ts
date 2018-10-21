import { HttpService } from "./http.service";
import { httpServiceFactory } from "../factories/http-service.factory";
import { XHRBackend, RequestOptions, HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
      CommonModule,
      HttpModule
    ],
    exports: [
      
    ],
    declarations: [
      
    ],
    providers: [
      {
        provide: HttpService,
        useFactory: httpServiceFactory,
        deps: [XHRBackend, RequestOptions]
      }
    ]
  })
  
  export class CoreModule { }