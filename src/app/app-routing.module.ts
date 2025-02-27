import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';

const routes: Routes = [
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/create', component: AppointmentCreateComponent },
  { path: 'appointments/edit/:id', component: AppointmentEditComponent },
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: '**', redirectTo: '/appointments' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
