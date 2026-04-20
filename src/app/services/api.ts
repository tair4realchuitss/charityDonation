import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/campaigns/`);
  }

  getCampaignById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/campaigns/${id}/`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories/`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile/`, this.getAuthHeaders());
  }

  postComment(commentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/comments/`, commentData, this.getAuthHeaders());
  }

  makeDonation(campaignId: number, amount: number): Observable<any> {
    const body = { campaign: campaignId, amount: amount };
    return this.http.post(`${this.baseUrl}/donations/`, body, this.getAuthHeaders());
  }
}