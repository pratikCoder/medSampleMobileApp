import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPatientTestPage } from './add-patient-test';

@NgModule({
  declarations: [
    AddPatientTestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPatientTestPage),
  ],
})
export class AddPatientTestPageModule {}
