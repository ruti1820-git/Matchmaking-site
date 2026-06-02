import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoysService {

  private api = 'http://localhost:3000/api/boys';

  constructor(private http: HttpClient) {}

  getBoys() {
    return this.http.get<any[]>(this.api);
  }

  addBoy(formData: FormData) {
    return this.http.post(this.api, formData);
  }

  deleteBoy(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}