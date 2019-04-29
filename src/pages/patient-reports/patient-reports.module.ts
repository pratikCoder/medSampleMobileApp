import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientReportsPage } from './patient-reports';

@NgModule({
  declarations: [
    PatientReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientReportsPage),
  ],
})
export class PatientReportsPageModule {}
