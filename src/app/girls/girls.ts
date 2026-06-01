import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  selectedImage: string | null = null;

  // גישה לתיבת החיפוש ב-HTML
  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.girlsList = this.candidateService.getGirls();
  }

  // האזנה ללחיצות מקלדת גלובליות
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault(); // מונע את חיפוש הדפדפן הרגיל
      this.nameInput.nativeElement.focus(); // שם את הפוקוס על האינפוט
    }
  }

  openImage(url: string) { this.selectedImage = url; }
  closeImage() { this.selectedImage = null; }

  get filteredCandidates() {
    return this.girlsList.filter(c => 
      (this.searchName === '' || c.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (this.searchAge === null || c.age === this.searchAge)
    );
  }
}