import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultModule } from './search-result/search-result.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';

// Services
import { YoutubeApiService } from '../services/youtube-api.service';
import { GridColumnsDefinitionService } from '../services/columns-definitions.service';
import {UpdateService} from '../services/update.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SearchResultModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [YoutubeApiService, GridColumnsDefinitionService, UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
