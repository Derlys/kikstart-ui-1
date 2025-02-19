import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LayoutConsoleModule } from '@kikstart-ui/layout-console'
import { UiHeroModule } from '@kikstart-ui/ui-hero'
import { DemoLayoutWebComponent } from './demo-layout-web.component'

@NgModule({
  declarations: [DemoLayoutWebComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: DemoLayoutWebComponent }]),
    LayoutConsoleModule,
    UiHeroModule,
  ],
})
export class DemoLayoutWebModule {}
