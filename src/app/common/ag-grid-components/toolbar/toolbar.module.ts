import { NgModule } from '@angular/core';

// Components
import { CustomStatsToolPanelComponent } from './toolbar.component';

// Services
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
