import { NgModule } from '@angular/core';
import { ThumbnailRenderer } from './thumbnail-renderer';

@NgModule({
  declarations: [ThumbnailRenderer],
  entryComponents: [ThumbnailRenderer],
  exports: [ThumbnailRenderer],
})

export class ThumbnailRendererModule {
}
