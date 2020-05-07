import { NgModule } from '@angular/core';
import { CustomStatsToolPanelComponent } from './toolbar.component';
import {GridColumnsDefinitionService} from '../../../../services/columns-definitions.service';

@NgModule({
  imports: [],
  declarations: [CustomStatsToolPanelComponent],
  entryComponents: [CustomStatsToolPanelComponent],
  exports: [CustomStatsToolPanelComponent],
  providers: [GridColumnsDefinitionService],
})

export class CustomStatsToolPanelModule {
}
