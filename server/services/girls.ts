import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Girls {

  private api = 'http://localhost:3000/api/girls';

  constructor(private http: HttpClient) {}

  getGirls() {
    return this.http.get<any[]>(this.api);
  }
}