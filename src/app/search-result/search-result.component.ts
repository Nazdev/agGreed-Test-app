import { Component, OnInit } from '@angular/core';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { CustomStatsToolPanelComponent } from '../common/ag-grid-components/toolbar/toolbar.component';
import { ModuleRegistry, AllModules } from '@ag-grid-enterprise/all-modules';
import { GetContextMenuItemsParams } from 'ag-grid-community';
import { ThumbnailRendererComponent } from '../common/ag-grid-components/renderers/thumbnail-renderer/thumbnail-renderer';
import { LinkRendererComponent } from '../common/ag-grid-components/renderers/link-renderer/link-renderer';
import { CheckRendererComponent } from '../common/ag-grid-components/renderers/check-renderer/check-renderer';
import { CheckBoxHeaderComponent } from '../common/ag-grid-components/headers/checkbox-header';
import { GridColumnsDefinitionService } from '../../services/columns-definitions.service';
import { SearchResultItemModel } from '../../models/search-result-item/search-item-title.model';
import { DatePipe } from '@angular/common';
ModuleRegistry.registerModules(AllModules);
import {ProgressiveComponent} from '../../components/progressive.component';
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
    customStatsToolPanel: CustomStatsToolPanelComponent,
    thumbnailRenderer: ThumbnailRendererComponent,
    linkRenderer: LinkRendererComponent,
    checkRenderer: CheckRendererComponent,
    checkBoxHeader: CheckBoxHeaderComponent
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
  public getContextMenuItems(params: any) {
    const defaultContextMenu: Array<any> = [
      'copy', 'copyWithHeaders', 'paste'
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
  public async getGoogleYoutubeData(): Promise<void> {
    this.handleObservable<any>(this.youtubeApiService.getData(), (data: SearchResultItemModel[]) => {
      this.rowData = data;
    }, error => {
      console.log(error);
    });
  }


}
