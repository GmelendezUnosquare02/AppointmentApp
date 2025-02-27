import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment.model';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-create',
  imports: [MatFormFieldModule,
            MatInputModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule],
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppointmentCreateComponent {
  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService, private router: Router) {
    this.appointmentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    if (selectedDate < today) {
      return { invalidDate: true };
    }
    return null;
  }

  createAppointment(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    const formValue = this.appointmentForm.value;
    const formattedDate = new Date(formValue.date).toISOString();

    const newAppointment: Appointment = {
      id: 0,
      title: formValue.title,
      date: formattedDate,
      user: 'user123',
      isApproved: false,
      isCanceled: false
    };
  
    this.appointmentService.createAppointment(newAppointment).subscribe(
      () => {
        console.log('Appointment created successfully');
        this.router.navigate(['/appointments']);
      },
      (error) => {
        console.error('Error creating appointment:', error);
      }
    );
  }
}
