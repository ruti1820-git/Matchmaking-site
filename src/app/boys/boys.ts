import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../models/candidate';
import { CandidateService } from '../services/candidate';

@Component({
  selector: 'app-boys',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boys.html',
  styleUrl: './boys.scss',
})
export class Boys implements OnInit {
  boysList: Candidate[] = [];
  searchName: string = '';
  searchAge: number | null = null;
  
  // משתנה לניהול התמונה הנבחרת
  selectedImage: string | null = null;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.boysList = this.candidateService.getBoys();
  }

  // פונקציות לניהול התצוגה
  openImage(url: string) {
    this.selectedImage = url;
  }

  closeImage() {
    this.selectedImage = null;
  }

  get filteredCandidates() {
    return this.boysList.filter(c => 
      (this.searchName === '' || c.name.includes(this.searchName)) &&
      (this.searchAge === null || c.age === this.searchAge)
    );
  }
}