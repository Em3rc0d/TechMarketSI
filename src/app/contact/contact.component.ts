import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  formMessage: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/contact', this.contactForm.value).subscribe({
        next: (response) => {
          this.formMessage = true;
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error:', error);
          console.error('Response Body:', error.error); // Muestra el cuerpo de la respuesta del error
          alert('Error al enviar los datos. Inténtalo nuevamente.');
        }        
      });
    }
  }
}
