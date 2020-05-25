import { NgModule } from '@angular/core';

// Components
import { ThumbnailRendererComponent } from './thumbnail-renderer';

@NgModule({
  declarations: [ThumbnailRendererComponent],
  entryComponents: [ThumbnailRendererComponent],
  exports: [ThumbnailRendererComponent],
})

export class ThumbnailRendererModule {
}
