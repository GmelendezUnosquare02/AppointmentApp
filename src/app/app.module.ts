import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppointmentListComponent,
    AppointmentCreateComponent,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
