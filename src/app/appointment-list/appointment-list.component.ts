import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  imports: [MatTableModule, CommonModule, RouterModule ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  displayedColumns: string[] = ['title', 'date', 'status'];

  // Get appointments for a specific user (replace with dynamic username)
  getAppointments(): void {
    this.appointmentService.getAppointmentsForUser('user123').subscribe(
      (data) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
}
