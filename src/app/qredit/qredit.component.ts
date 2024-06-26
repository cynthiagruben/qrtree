import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
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
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.qrData()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onPrimaryColor(event: any) {
    this.primarycolor = event.target.value;
  }

  onTextColor(event: any) {
    this.textcolor = event.target.value;
  }

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      this.QRId = params['id'];
      const data = { "id": this.QRId, "text": "aaa", "primaryColor": this.primarycolor, "img": this.img, "isactive": "true", "textColor": this.textcolor }
      this.apiService.updateQrData(data).subscribe(response => {
      }, error => {
        console.error('Fehler beim Senden der Daten:', error);
      });
    });
    
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:3000/api/upload', formData).subscribe(response => {
      },
      error => {
        console.error('Es gab einen Fehler!', error);
      }
    );
    }

    window.location.href = this.router.url;
  }

  qrData() {
    this.route.queryParams.subscribe(params => {
      this.QRId = params['id'];
      if (this.QRId) {
        this.apiService.getQrSingleData(this.QRId).subscribe(
          response => {
            this.data = response;

            this.shortlink = "https://uni.grub-bros.de:8081/api/url/" + this.data.shortedlink
            this.link = this.data.mainlink
            this.primarycolor = this.data.primarycolor
            this.textcolor = this.data.textcolor
            this.img = this.data.img
            this.qrimg = this.data.qrimg

            if(this.data.deactivated == false) {
              console.log(this.data.deactivated)
              this.renderer.setAttribute(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'), 'src', '../../assets/img/toogle-right-svgrepo-com.svg')
            } else {
              console.log(this.data.deactivated)
              this.renderer.setAttribute(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'), 'src', '../../assets/img/toogle-left-svgrepo-com.svg')
            }
          },
          error => {
            console.error('Es gab einen Fehler!', error);
          }
        );
      }
    });
  }

  toggleQRLink(): void{
    console.log(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'))
    if(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg').classList.contains("activ")) {
      this.renderer.setAttribute(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'), 'src', '../../assets/img/toogle-left-svgrepo-com.svg')
      this.renderer.removeClass(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'), 'activ')
    } else {
      this.renderer.setAttribute(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'), 'src', '../../assets/img/toogle-right-svgrepo-com.svg')
      this.renderer.addClass(this.elementRef.nativeElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'), 'activ')
    }
  }
  
}
