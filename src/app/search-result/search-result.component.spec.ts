import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridColumnsDefinitionService } from '../../services/columns-definitions.service';
import { YoutubeApiService } from '../../services/youtube-api.service';
import { LinkRendererModule } from '../common/ag-grid-components/renderers/link-renderer/link-renderer.module';
import { CheckRendererModule } from '../common/ag-grid-components/renderers/check-renderer/check-renderer.module';
import { ThumbnailRendererModule } from '../common/ag-grid-components/renderers/thumbnail-renderer/thumbnail-renderer.module';
import { CheckBoxHeaderModule } from '../common/ag-grid-components/headers/checkbox-header.module';
import { CustomStatsToolPanelModule } from '../common/ag-grid-components/toolbar/toolbar.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CommonModule, DatePipe } from '@angular/common';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomStatsToolPanelModule,
        CommonModule,
        LinkRendererModule,
        CheckRendererModule,
        ThumbnailRendererModule,
        CheckBoxHeaderModule,
        HttpClientTestingModule,
        AgGridModule.withComponents([])],
      declarations: [SearchResultComponent],
      providers: [
        YoutubeApiService,
        GridColumnsDefinitionService,
        DatePipe],
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should rowData length', () => {
  //   expect(component.rowData.length).toEqual(2);
  // });

  it('should have column definitions', () => {
    expect(component.columnDefs.length).toBeGreaterThan(0);
  });

  it('should have column id "selection"', () => {
    expect(component.columnDefs.find(x => x.colId === 'selection')).toBeTruthy();
  });

  it('should have default side bar panel', () => {
    expect(component.sideBar.defaultToolPanel).toEqual('customStats');
  });

  it('should have side bar', () => {
    expect(component.sideBar.toolPanels.length).toBeGreaterThan(0);
  });


  it('should return (getContextMenuItems()) if filed == title', () => {
    spyOn(component, 'getContextMenuItems').and.callThrough();
    const expectedValueTitleArray = ['copy', 'copyWithHeaders', 'paste' , 'Open in new tab'];
    expect(component.getContextMenuItems({column: {
        getColDef: () => {
          return  {field : 'title'};
        }
      }
    }).length).toEqual(expectedValueTitleArray.length);
  });

  it('should return (getContextMenuItems()) if filed != title', () => {
    spyOn(component, 'getContextMenuItems').and.callThrough();
    const expectedValueNoTitleArray = ['copy', 'copyWithHeaders', 'paste'];
    expect(component.getContextMenuItems({column: {
        getColDef: () => {
          return  {field : 'notTitle'};
        }
      }
    }).length).toEqual(expectedValueNoTitleArray.length);
  });

  it('should run getGoogleYoutubeData', () => {
    spyOn(component, 'getGoogleYoutubeData').and.callThrough();
    component.getGoogleYoutubeData();
    expect(component.getGoogleYoutubeData).toHaveBeenCalled();
  });
});
