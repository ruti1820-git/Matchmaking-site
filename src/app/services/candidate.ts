import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  // רשימת הבנים
  private boys: Candidate[] = [
    { 
      id: 1, 
      name: ' מיכאל קוביוף', 
      age: 29, 
      city: 'ירושלים', 
      description: 'לומד בחור מצוין',
  // במערך girls שלך:
imageUrl: 'BEN/m.jpg',
resumeUrl: 'BEN/CV/m.pdf'    }
  ];

  // רשימת הבנות - כאן הוספנו את המערך החדש
  private girls: Candidate[] = [
    { 
      id: 101, 
      name: 'שולמית גוגיג', 
      age: 27, 
      city: 'ירושלים', 
      description: 'תכנות',
  // במערך girls שלך:
imageUrl: 'BAT/Shulamit.jpg',
resumeUrl: 'BAT/CV/S.pdf'    },
    { 
      id: 102, 
      name: 'שרה וינוגרד', 
      age: 33, 
      city: 'ירושלים', 
      description: 'תכנות',
  // במערך girls שלך:
imageUrl: 'BAT/SARA.jpg',
resumeUrl: 'BAT/CV/SARA.pdf'    }
  ];

  getBoys(): Candidate[] {
    return this.boys;
  }

  getGirls(): Candidate[] {
    return this.girls;
  }
}