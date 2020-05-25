import { NgModule } from '@angular/core';

// Components
import { CheckBoxHeaderComponent } from './checkbox-header';

@NgModule({
  declarations: [CheckBoxHeaderComponent],
  entryComponents: [CheckBoxHeaderComponent],
  exports: [CheckBoxHeaderComponent],
})

export class CheckBoxHeaderModule {
}
