import { Component } from '@angular/core';
import { IToolPanel, IToolPanelParams } from '@ag-grid-community/all-modules';
import { GridColumnsDefinitionService } from '../../../../services/columns-definitions.service';

@Component({
  selector: 'app-custom-stats',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class CustomStatsToolPanel implements IToolPanel {
  private params: IToolPanelParams;
  public totalRecordsCount: number;
  private selectedRowsCount: number;
  private selectionModeOn: boolean;

  constructor(private gridColumnsDefinitionService: GridColumnsDefinitionService) { }

  public refresh(): void {}

  public agInit(params: IToolPanelParams): void {
    this.params = params;
    this.totalRecordsCount = 0;
    this.selectedRowsCount = 0;
    this.selectionModeOn = false;

    this.params.api.addEventListener('rowSelected', this.updateTotals.bind(this));
    this.params.api.addEventListener('modelUpdated', this.updateTotals.bind(this));
  }

  public updateTotals(): void {
    let totalRecordsNumber = 0;
    let selectedRowsNumber = 0;

    this.params.api.forEachNode( (rowNode) => {
      totalRecordsNumber++;
      if (rowNode.isSelected()) {
        selectedRowsNumber++;
      }
    });

    this.selectedRowsCount = selectedRowsNumber;
    this.totalRecordsCount = totalRecordsNumber;
  }

  public toggleSelectionMode(): void {
    if (this.selectionModeOn) {
      this.params.api.forEachNode( (rowNode) => {
        rowNode.selectThisNode(false);
      });
    }
    this.selectionModeOn = !this.selectionModeOn;
    this.gridColumnsDefinitionService.getColumnApi().setColumnVisible('selection', this.selectionModeOn);
  }
}
