import { NgModule } from '@angular/core';

// Components
import { LinkRendererComponent } from './link-renderer';

  @NgModule({
    declarations: [LinkRendererComponent],
    entryComponents: [LinkRendererComponent],
    exports: [LinkRendererComponent],
  })

  export class LinkRendererModule {
}
