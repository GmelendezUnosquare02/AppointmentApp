import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://localhost:7283/api/appointments'; // Update with your API URL

  constructor(private http: HttpClient) { }

  // Get all appointments for a user
  getAppointmentsForUser(username: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/user/${username}`);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  // Get all appointments for a manager
  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  // Create a new appointment
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  // Update an existing appointment
  updateAppointment(id: number, appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, appointment);
  }

  // Delete an appointment
  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Approve an appointment (Manager only)
  approveAppointment(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve/${id}`, {});
  }

  // Cancel an appointment (Manager only)
  cancelAppointment(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancel/${id}`, {});
  }

  // Manager delete an appointment (if canceled)
  managerDeleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
