import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoysService } from '../services/boys';

@Component({
  selector: 'app-boys',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boys.html',
  styleUrls: ['./boys.scss']
})
export class Boys implements OnInit {

  boysList: any[] = [];

  searchName: string = '';
  searchAge: number | null = null;
  searchCity: string = '';
  searchTribe: string = '';

  selectedImage: string | null = null;

  constructor(private boysService: BoysService) {}

  ngOnInit() {
      console.log('BOYS COMPONENT LOADED');
    this.loadBoys();
  }

  loadBoys() {
    this.boysService.getBoys().subscribe({
      next: (data: any) => this.boysList = data,
      error: (err: any) => console.error(err)
    });
  }

  get filteredBoys() {
    return this.boysList.filter(boy => {

      const matchName =
        !this.searchName ||
        boy.name?.toLowerCase().includes(this.searchName.toLowerCase());

      const matchAge =
        !this.searchAge ||
        boy.age === Number(this.searchAge);

      const matchCity =
        !this.searchCity ||
        boy.city?.toLowerCase().includes(this.searchCity.toLowerCase());

      const matchTribe =
        !this.searchTribe ||
        boy.tribe?.toLowerCase().includes(this.searchTribe.toLowerCase());

      return matchName && matchAge && matchCity && matchTribe;
    });
  }

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = null;
  }

  getImageUrl(path: string) {
    return `http://localhost:3000/${path}`;
  }

  getPdfUrl(path: string) {
    return `http://localhost:3000/${path}`;
  }
}