import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmailSummary, Email } from './email-interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${environment.baseURL}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${environment.baseURL}/emails/${id}`);
  }
}
