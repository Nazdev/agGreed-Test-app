import { NgModule } from '@angular/core';
import { CustomStatsToolPanel } from './toolbar.component';
import { GridColumnsDefinitionService } from '../../../../services/columns-definitions.service';

@NgModule({
  imports: [],
  declarations: [CustomStatsToolPanel],
  entryComponents:[CustomStatsToolPanel],
  exports: [CustomStatsToolPanel],
  providers: [GridColumnsDefinitionService],
})

export class CustomStatsToolPanelModule {
}
