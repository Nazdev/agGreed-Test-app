import {Component} from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-thumbnail-cell',
    template: `<img [src]="imgSrc" alt="thumbnail-default">`
})
export class ThumbnailRenderer implements ICellRendererAngularComp {
  constructor() {}
  private params: ICellRendererParams;
  public imgSrc: string;

  public agInit(params: ICellRendererParams ): void {
    this.params = params;
    this.imgSrc = this.params.value;
  }

  public refresh(): boolean {
      return false;
  }
}
