import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4XdZD_Oi_4dWAyEflSrKeXkiLMmaBD-I",
  authDomain: "my-project-24edb.firebaseapp.com",
  projectId: "my-project-24edb",
  storageBucket: "my-project-24edb.firebasestorage.app",
  messagingSenderId: "152220061002",
  appId: "1:152220061002:web:897adee7e200dc86c345b3",
  measurementId: "G-SY1E5GZM4N"
};

// אתחול האפליקציה
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  newCandidate = { name: '', age: 0, city: '', description: '', imageUrl: '', resumeUrl: '' };

  async uploadFile(event: any, type: 'image' | 'pdf') {
    const file = event.target.files[0];
    if (!file) return;

    // יוצרים נתיב לקובץ: images/שם_הקובץ או pdfs/שם_הקובץ
    const storageRef = ref(storage, `${type}s/${Date.now()}_${file.name}`);

    try {
      // העלאת הקובץ ל-Firebase
      const snapshot = await uploadBytes(storageRef, file);
      // קבלת הלינק הסופי
      const url = await getDownloadURL(snapshot.ref);
      
      if (type === 'image') this.newCandidate.imageUrl = url;
      else this.newCandidate.resumeUrl = url;
      
      alert('הקובץ הועלה בהצלחה!');
    } catch (error) {
      console.error("שגיאת העלאה:", error);
      alert('שגיאת העלאה: בדקי שה-Rules ב-Firebase מוגדרים ל-true');
    }
  }
}