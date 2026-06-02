import { Injectable } from '@angular/core';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {


  private boys: Candidate[] = [
    { 
      id: 1, 
      name: ' מיכאל קוביוף', 
      age: 29, 
      city: 'ירושלים', 
      description: 'לומד בחור מצוין',
      imageUrl: 'BEN/m.jpg',
      resumeUrl: 'BEN/CV/m.pdf'   
     }
  ];

  private girls: Candidate[] = [
    { 
      id: 101, 
      name: 'שולמית גוגיג', 
      age: 27, 
      city: 'ירושלים', 
      description: 'תכנות',
      imageUrl: 'BAT/Shulamit.jpg',
      resumeUrl: 'BAT/CV/S.pdf' 
  },
    { 
      id: 102, 
      name: 'שרה וינוגרד', 
      age: 33, 
      city: 'ירושלים', 
      description: 'תכנות',
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