import {Component} from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {UpdateService} from '../../../../../services/update.service';

@Component({
  selector: 'app-checkbox-cell',
  template: `<input type="checkbox" [checked]="params.node['selected']" (change)="checkValue($event)" />`
})
export class CheckRenderer implements ICellRendererAngularComp {
  private params: ICellRendererParams;
  public isChecked = false;
  public arrayListCheckbox: Array<boolean>;

  constructor(private updateService: UpdateService) {
  }

  public agInit(params: ICellRendererParams ): void {
    this.params = params;
  }

  public checkValue(event: any): void {
    this.arrayListCheckbox = [];
    this.params.node.selectThisNode(event.currentTarget.checked);
    this.isChecked = event.currentTarget.checked;
    this.params.api.forEachNode( (rowNode, index) => {
      this.arrayListCheckbox.push(rowNode['selected']);
    });
    if (this.arrayListCheckbox.every(this.checkArrayElement) === false) {
      this.updateService.notifyOther({option: 'EventUpdateHeaderCheckbox', value:  false});
    } else {
      this.updateService.notifyOther({option: 'EventUpdateHeaderCheckbox', value:  this.isChecked});
    }
  }
  public refresh(): boolean {
      return false;
  }
  public checkArrayElement(el, index, arr): boolean {
    if (index === 0) {
      return true;
    } else {
      return (el === arr[index - 1]);
    }
  }
}
