import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  // Correct plural form for styleUrls
})
export class AppComponent {
  title = 'AppointmentApp';
}
