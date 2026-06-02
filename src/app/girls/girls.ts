import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GirlsService } from '../services/girls';

@Component({
  selector: 'app-girls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './girls.html',
  styleUrls: ['./girls.scss']
})
export class Girls implements OnInit {

  girlsList: any[] = [];

  searchName: string = '';
  searchAge: number | null = null;
  searchCity: string = '';
  searchTribe: string = '';

  selectedImage: string | null = null;

  constructor(private girlsService: GirlsService) {}

  ngOnInit() {
    this.loadGirls();
  }

  loadGirls() {
    this.girlsService.getGirls().subscribe({
      next: (data: any) => this.girlsList = data,
      error: (err: any) => console.error(err)
    });
  }

  get filteredGirls() {
    return this.girlsList.filter(girl => {

      const matchName =
        !this.searchName ||
        girl.name?.toLowerCase().includes(this.searchName.toLowerCase());

      const matchAge =
        !this.searchAge ||
        girl.age === Number(this.searchAge);

      const matchCity =
        !this.searchCity ||
        girl.city?.toLowerCase().includes(this.searchCity.toLowerCase());

      const matchTribe =
        !this.searchTribe ||
        girl.tribe?.toLowerCase().includes(this.searchTribe.toLowerCase());

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