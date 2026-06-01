import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../models/candidate';
import { CandidateService } from '../services/candidate';

@Component({
  selector: 'app-girls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './girls.html',
  styleUrls: ['./girls.scss']
})
export class Girls implements OnInit {
  girlsList: Candidate[] = [];
  searchName: string = '';
  searchAge: number | null = null;
  
  // משתנה לניהול התמונה שנבחרה להגדלה
  selectedImage: string | null = null;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.girlsList = this.candidateService.getGirls();
  }

  // פונקציות לפתיחה וסגירה של התמונה
  openImage(url: string) {
    this.selectedImage = url;
  }

  closeImage() {
    this.selectedImage = null;
  }

  get filteredCandidates() {
    return this.girlsList.filter(c => 
      (this.searchName === '' || c.name.includes(this.searchName)) &&
      (this.searchAge === null || c.age === this.searchAge)
    );
  }
}