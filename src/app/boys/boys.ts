import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../models/candidate';
import { CandidateService } from '../services/candidate';

@Component({
  selector: 'app-boys',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boys.html',
  styleUrls: ['./boys.scss'],
})
export class Boys implements OnInit {
  boysList: Candidate[] = [];
  searchName: string = '';
  searchAge: number | null = null;
  selectedImage: string | null = null;

  // גישה לאינפוט החיפוש ב-HTML
  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.boysList = this.candidateService.getBoys();
  }

  // האזנה ללחיצת CTRL+F
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.nameInput.nativeElement.focus();
    }
  }

  openImage(url: string) { this.selectedImage = url; }
  closeImage() { this.selectedImage = null; }

  get filteredCandidates() {
    return this.boysList.filter(c => 
      (this.searchName === '' || c.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (this.searchAge === null || c.age === this.searchAge)
    );
  }
}