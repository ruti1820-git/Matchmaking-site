import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {

  name = '';
  email = '';
  message = '';

  gender = '';
age: number | null = null;
city = '';
tribe = '';
  imageFile: File | null = null;
  pdfFile: File | null = null;

  isLoading = false;

  constructor(private http: HttpClient) {}

  // 📷 תמונה
  onImage(event: any) {
    this.imageFile = event.target.files[0];
  }

  // 📄 PDF
  onPdf(event: any) {
    this.pdfFile = event.target.files[0];
  }

  // 🚀 שליחה לשרת
  send() {

    if (!this.name || !this.email || !this.message) {
      alert('מלאי את כל השדות');
      return;
    }

    if (!this.gender) {
      alert('חובה לבחור מין');
      return;
    }

    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('message', this.message);

    formData.append('gender', this.gender);

    // ⭐ השדות החדשים
    formData.append('age', String(this.age ?? ''));
    formData.append('city', this.city);
    formData.append('tribe', this.tribe);

  

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    if (this.pdfFile) {
      formData.append('pdf', this.pdfFile);
    }

    this.isLoading = true;

    this.http.post('http://localhost:3000/api/contact', formData)
      .subscribe({
        next: () => {
          alert('נשלח בהצלחה 🚀');

          // reset
          this.name = '';
          this.email = '';
          this.message = '';
          this.gender = '';
          this.age = null;
          this.city = '';
          this.tribe = '';
          this.imageFile = null;
          this.pdfFile = null;
        },
        error: (err: any) => {
          console.error(err);
          alert('שגיאה בשליחה');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}