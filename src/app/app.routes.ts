import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { QrcodesComponent } from './qrcodes/qrcodes.component';
import { QreditComponent } from './qredit/qredit.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { QrviewComponent } from './qrview/qrview.component';

export const routes: Routes = [
      { path: '', component: MainComponent },
      { path: 'qr', component: QrcodesComponent },
      { path: 'qrview', component: QrviewComponent},
      { path: 'qredit', component: QreditComponent },
      { path: 'imprint', component: ImpressumComponent },
      { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
