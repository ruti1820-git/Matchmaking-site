import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// הגדרות Firebase שלך
const firebaseConfig = {
  apiKey: "AIzaSyC4XdZD_Oi_4dWAyEflSrKeXkiLMmaBD-I",
  authDomain: "my-project-24edb.firebaseapp.com",
  projectId: "my-project-24edb",
  storageBucket: "my-project-24edb.firebasestorage.app",
  messagingSenderId: "152220061002",
  appId: "1:152220061002:web:897adee7e200dc86c345b3",
  measurementId: "G-SY1E5GZM4N"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  newCandidate = { name: '', age: null as number | null, city: '', description: '', imageUrl: '', resumeUrl: '' };
  isUploading = false;

  async uploadFile(event: any, type: 'image' | 'pdf') {
    const file = event.target.files[0];
    if (!file) return;

    this.isUploading = true;
    try {
      const storageRef = ref(storage, `${type}s/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      if (type === 'image') this.newCandidate.imageUrl = url;
      else this.newCandidate.resumeUrl = url;
      
      alert('הקובץ הועלה בהצלחה!');
    } catch (error) {
      console.error("שגיאת העלאה:", error);
      alert('שגיאת העלאה: ודאי שה-Storage Rules מוגדרים ל-true');
    } finally {
      this.isUploading = false;
    }
  }

  async saveCandidate() {
    if (!this.newCandidate.name || !this.newCandidate.age) {
      alert('נא למלא שם וגיל');
      return;
    }

    try {
      await addDoc(collection(db, "candidates"), this.newCandidate);
      alert('המועמד נשמר בהצלחה!');
      this.newCandidate = { name: '', age: null, city: '', description: '', imageUrl: '', resumeUrl: '' };
    } catch (e) {
      console.error("שגיאת שמירה:", e);
      alert('שגיאת שמירה למסד הנתונים');
    }
  }
}