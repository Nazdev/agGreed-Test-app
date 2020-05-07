import { NgModule } from '@angular/core';
import { ThumbnailRendererComponent } from './thumbnail-renderer';

@NgModule({
  declarations: [ThumbnailRendererComponent],
  entryComponents: [ThumbnailRendererComponent],
  exports: [ThumbnailRendererComponent],
})

export class ThumbnailRendererModule {
}
