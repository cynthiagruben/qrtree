import { Component } from '@angular/core';
import { GetQrCodesService } from '../get-qr-codes.service';
import { KeycloakService } from 'keycloak-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-qredit',
  standalone: true,
  imports: [],
  templateUrl: './qredit.component.html',
  styleUrl: './qredit.component.css'
})
export class QreditComponent {

  form?: FormGroup;
  selectedFile: File | null = null;

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

  colorInput: string = '#000000';

  constructor(
    private apiService: GetQrCodesService,
    private keycloakService: KeycloakService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.qrData()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onPrimaryColor(event: any) {
    this.primarycolor = event.target.value;
    console.log(this.primarycolor)
  }

  onTextColor(event: any) {
    this.textcolor = event.target.value;
    console.log(this.textcolor)
  }

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      this.QRId = params['id'];
      const data = { "id": this.QRId, "text": "aaa", "primaryColor": this.primarycolor, "img": this.img, "isactive": "true", "textColor": this.textcolor }
      this.apiService.updateQrData(data).subscribe(response => {
        console.log('Response:', response);
      }, error => {
        console.error('Fehler beim Senden der Daten:', error);
      });
    });
    
    const formData = new FormData();

    console.log(this.primarycolor + " Halloo")

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:3000/api/upload', formData).subscribe(response => {
        console.log('File upload response:', response);
      },
      error => {
        console.error('Es gab einen Fehler!', error);
      }
    );
    }

    window.location.href = this.router.url;
    console.log(this.router.url);
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
