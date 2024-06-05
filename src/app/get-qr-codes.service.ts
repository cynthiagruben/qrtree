import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetQrCodesService {

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  getQrEditorData(userId: string): Observable<any> {
    return this.http.get<any>('https://uni.grub-bros.de:8081/api/account/' + userId + '/allqrcodes', this.httpOptions);
  }

  getQrViewData(userId: string): Observable<any> {
    return this.http.get<any>('https://uni.grub-bros.de:8081/api/qrcodes/' + userId + '/qrcodes', this.httpOptions);
  }

  getQrSingleData(QrId: string): Observable<any> {
    return this.http.get<any>('https://uni.grub-bros.de:8081/api/qrcodes/' + QrId, this.httpOptions);
  }

  createQr(UserId: string): Observable<any> {
    const requestBody = { img: "../../assets/img/Owl_logo.png", text: "Hier könnte dein Text stehen", permaLink: "false", url: "https://google.de", primaryColor: "#ffffff", textColor: "#ffffff", deactivated: "false", UserId: UserId, };
    return this.http.post<any>('https://uni.grub-bros.de:8081/api/qrcodes/create', requestBody, this.httpOptions);
  }

  deactivateQR(id: any): Observable<any> {
    return this.http.get<any>('https://uni.grub-bros.de:8081/api/qrcodes/' + id + '/deactivate', this.httpOptions);
  }

  removeQR(Id: string): Observable<any> {
    return this.http.delete<any>('https://uni.grub-bros.de:8081/api/qrcodes/' + Id + '/delete', this.httpOptions);
  }

  accountCreate(userName: string, userId: string): Observable<any> {
    const requestBody = { name: userName, id: userId };
    return this.http.post<any>('https://uni.grub-bros.de:8081/api/account/create', requestBody, this.httpOptions);
  }

  analyticShotUrlFull(shortID: string): Observable<any> {
    return this.http.get<any>('https://uni.grub-bros.de:8081/api/analytics/fullaccess/' + shortID, this.httpOptions);
  }

  analyticShotUrl(shortID: string): Observable<any> {
    return this.http.get<any>('https://uni.grub-bros.de:8081/api/analytics/hourly/' + shortID, this.httpOptions);
  }
}
