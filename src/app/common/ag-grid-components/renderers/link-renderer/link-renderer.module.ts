import { NgModule } from '@angular/core';
import { LinkRendererComponent } from './link-renderer';

  @NgModule({
    declarations: [LinkRendererComponent],
    entryComponents: [LinkRendererComponent],
    exports: [LinkRendererComponent],
  })

  export class LinkRendererModule {
}
