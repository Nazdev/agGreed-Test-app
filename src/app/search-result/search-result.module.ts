import { NgModule } from '@angular/core';
import { SearchResultComponent } from './search-result.component';
import { AgGridModule } from 'ag-grid-angular';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { GridColumnsDefinitionService } from '../../services/columns-definitions.service';
import { LinkRendererModule } from '../common/ag-grid-components/renderers/link-renderer/link-renderer.module';
import { CustomStatsToolPanelModule } from '../common/ag-grid-components/toolbar/toolbar.module';
import { CheckRendererModule } from '../common/ag-grid-components/renderers/check-renderer/check-renderer.module';
import { ThumbnailRendererModule } from '../common/ag-grid-components/renderers/thumbnail-renderer/thumbnail-renderer.module';
import { CheckBoxHeaderModule } from '../common/ag-grid-components/headers/checkbox-header.module';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CustomStatsToolPanelModule,
    LinkRendererModule,
    CheckRendererModule,
    ThumbnailRendererModule,
    CheckBoxHeaderModule,
    AgGridModule.withComponents([])],
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent],
  providers: [GridColumnsDefinitionService, YoutubeApiService, DatePipe],
})

export class SearchResultModule {
}
