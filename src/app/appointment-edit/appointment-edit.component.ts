import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-edit',
   imports: [MatFormFieldModule,
              MatInputModule,
              FormsModule,
              ReactiveFormsModule,
              CommonModule],
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentId!: number;
  isLoading = true;
  errorMessage: string = '';  // ✅ Add the missing property

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.appointmentId = +id;
        this.loadAppointment(this.appointmentId);
      }
    });
  }

  loadAppointment(id: number): void {
    this.appointmentService.getAppointmentById(id).subscribe(
      (appointment) => {
        this.appointmentForm.patchValue({
          title: appointment.title,
          date: new Date(appointment.date).toISOString().slice(0, 16) // Convert to input-friendly format
        });
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load appointment.';  // ✅ Set error message
        this.isLoading = false;
      }
    );
  }

  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate < today ? { invalidDate: true } : null;
  }

  updateAppointment(): void {
    if (this.appointmentForm.invalid) return;

    const updatedAppointment: Appointment = {
      id: this.appointmentId,
      title: this.appointmentForm.value.title,
      date: new Date(this.appointmentForm.value.date).toISOString(),
      user: 'user123',
      isApproved: false,
      isCanceled: false
    };

    this.appointmentService.updateAppointment(this.appointmentId, updatedAppointment).subscribe(
      () => {
        alert('Appointment updated successfully!');
        this.router.navigate(['/appointments']);
      },
      (error) => {
        this.errorMessage = 'Error updating appointment.';  // ✅ Handle update error
      }
    );
  }
}
