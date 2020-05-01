import { Component, OnInit } from '@angular/core';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { CustomStatsToolPanel } from '../common/ag-grid-components/toolbar/toolbar.component';
import { ModuleRegistry, AllModules } from '@ag-grid-enterprise/all-modules';
import { GetContextMenuItemsParams } from 'ag-grid-community';
import { ThumbnailRenderer } from '../common/ag-grid-components/renderers/thumbnail-renderer/thumbnail-renderer';
import { LinkRenderer } from '../common/ag-grid-components/renderers/link-renderer/link-renderer';
import { CheckRenderer } from '../common/ag-grid-components/renderers/check-renderer/check-renderer';
import { CheckBoxHeader } from '../common/ag-grid-components/headers/checkbox-header';
import { GridColumnsDefinitionService } from '../../services/columns-definitions.service';
import { SearchResponseModel } from '../../models/youtube-api/search/search-response.model';
import { SearchResultItemModel } from '../../models/search-result-item/search-item-title.model';
import { SearchResultItemTitleModel } from '../../models/search-result-item/search-item.model';
import { DatePipe } from '@angular/common';
ModuleRegistry.registerModules(AllModules);
import {ProgressiveComponent} from '../../components/progressiveComponent';
import '@ag-grid-enterprise/clipboard';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})

export class SearchResultComponent extends ProgressiveComponent implements OnInit {
  public rowData: Array<SearchResultItemModel>;
  public columnDefs = [
    { headerName: 'Selection', colId: 'selection', hide: true, cellRenderer: 'checkRenderer', headerComponent: 'checkBoxHeader', width: 50 },
    { headerName: '', field: 'thumbnail', width: 250, cellRenderer: 'thumbnailRenderer' },
    { headerName: 'Published on', field: 'publishedAt', width: 150, valueFormatter: (date) => this.datePipe.transform(date.value, 'yyyy-MM-dd')},
    { headerName: 'Video Title', field: 'title', width: 350, cellRenderer: 'linkRenderer'},
    { headerName: 'Description', field: 'description', width: 450 },
  ];

  public modules: any[] = AllModules;
  public icons = { 'custom-stat': '<span class="ag-icon ag-icon-custom-stats"></span>' };
  public frameworkComponents = {
    customStatsToolPanel: CustomStatsToolPanel,
    thumbnailRenderer: ThumbnailRenderer,
    linkRenderer: LinkRenderer,
    checkRenderer: CheckRenderer,
    checkBoxHeader: CheckBoxHeader
  };

  public sideBar = {
    toolPanels: [
      {
        id: 'customStats',
        labelDefault: 'Toolbar',
        labelKey: 'customStats',
        iconKey: 'custom-stats',
        toolPanel: 'customStatsToolPanel'
      }
    ],
    defaultToolPanel: 'customStats'
  };

 constructor(private youtubeApiService: YoutubeApiService, private gridColumnsDefinitionService: GridColumnsDefinitionService, private datePipe: DatePipe) {
    super();
  }

  async ngOnInit() {
    await this.getGoogleYoutubeData();
  }
  public getContextMenuItems(params: GetContextMenuItemsParams) {
    const defaultContextMenu: Array<any> = [
      'copy',
      'copyWithHeaders',
      'paste'
    ];

    if (params.column && params.column.getColDef().field === 'title') {
      defaultContextMenu.push({
        name: 'Open in new tab',
        action: () => {
          window.open(params.value.link, '_blank');
        }
      });
    }
    return defaultContextMenu;
  }
  public onGridReady(params) {
    this.gridColumnsDefinitionService.setColumnApi(params.columnApi);
  }
  private async getGoogleYoutubeData(): Promise<void> {
    this.handleObservable<any>(this.youtubeApiService.getData(), (data: SearchResponseModel) => {
        this.rowData = data.items.map((val) => {
          return {
            publishedAt: val.snippet.publishedAt,
            title: {
              text: val.snippet.title,
              link: `${'https://www.youtube.com/watch?v='}${val.id.videoId}`
            } as SearchResultItemTitleModel,
            description: val.snippet.description,
            thumbnail: val.snippet.thumbnails.default.url
          } as SearchResultItemModel;
        });
    }, error => {
      console.log(error);
    });
  }


}
