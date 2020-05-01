import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeApiService } from '../services/youtube-api.service';
import { GridColumnsDefinitionService } from '../services/columns-definitions.service';
import { SearchResultModule } from './search-result/search-result.module';
import {UpdateService} from "../services/update.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SearchResultModule,
  ],
  providers: [YoutubeApiService, GridColumnsDefinitionService, UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
