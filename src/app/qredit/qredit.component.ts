import { Component } from '@angular/core';
import { GetQrCodesService } from '../get-qr-codes.service';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-qredit',
  standalone: true,
  imports: [],
  templateUrl: './qredit.component.html',
  styleUrl: './qredit.component.css'
})
export class QreditComponent {

  data: any;
  QRId: any;

  shortlink: any;
  link: any;
  deactivated: any;
  id: any;
  img: any;
  primarycolor: any;
  qrimg: any
  text: any;
  textcolor: any;

  constructor(
    private apiService: GetQrCodesService,
    private keycloakService: KeycloakService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.qrData()
  }

  qrData() {
    this.route.queryParams.subscribe(params => {
      this.QRId = params['id'];
      if (this.QRId) {
        this.apiService.getQrSingleData(this.QRId).subscribe(
          response => {
            this.data = response;
            console.log(this.data);

            this.shortlink = "https://uni.grub-bros.de/api/url/" + this.data.shortedlink
            this.link = this.data.mainlink
            this.primarycolor = this.data.primarycolor
            this.textcolor = this.data.textcolor
            this.img = this.data.img
            this.qrimg = this.data.qrimg
          },
          error => {
            console.error('Es gab einen Fehler!', error);
          }
        );
      }
    });
  }

  
}
