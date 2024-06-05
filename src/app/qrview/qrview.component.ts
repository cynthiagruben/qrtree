import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { GetQrCodesService } from '../get-qr-codes.service';

@Component({
  selector: 'app-qrview',
  standalone: true,
  imports: [],
  templateUrl: './qrview.component.html',
  styleUrl: './qrview.component.css'
})
export class QrviewComponent {

  navHome: string = "";
  navQR: string = "";
  navAcc: string = "";

  qrLogoJson: string = "";
  qrTextJson: string = "";
  qrLinkJson: string = "";
  qrCodeJson: string = "";

  qrRemoveJson: string = "";
  qrEditJson: string = "";
  qrToggleJson: string = "";

  maxNum: any = 0;
  num: any = 0;

  data: any;
  userId: string | null = null;

  constructor(
    private dataService: DataService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private apiService: GetQrCodesService
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.navHome = data.navbar.home;
      this.navQR = data.navbar.qr;
      this.navAcc = data.navbar.account;

      this.qrLogoJson = data.standardQr.qrLogo;
      this.qrTextJson = data.standardQr.qrText;
      this.qrLinkJson = data.standardQr.qrLink;
      this.qrCodeJson = data.standardQr.qrCode;

      this.qrRemoveJson = data.qrSettings.remove;
      this.qrEditJson = data.qrSettings.edit;
      this.qrToggleJson = data.qrSettings.toggle;

      this.generateQRBox()
    });    

    this.route.queryParams.subscribe(params => {
      this.userId = params['user'];
      console.log(this.userId)
      if (this.userId) {
        this.apiService.getQrEditorData(this.userId).subscribe(
          response => {
            this.data = response;
            console.log(this.data);
          },
          error => {
            console.error('Es gab einen Fehler!', error);
            if(this.elementRef.nativeElement.parentElement.querySelector('#noUserBox').classList.contains("none")) {
              this.renderer.removeClass(this.elementRef.nativeElement.parentElement.querySelector('#noUserBox'), "none")
            }
          }
        );
      } else {
        if(this.elementRef.nativeElement.parentElement.querySelector('#noUserBox').classList.contains("none")) {
          this.renderer.removeClass(this.elementRef.nativeElement.parentElement.querySelector('#noUserBox'), "none")
        }
      }
    });
  }

  qrview(): void{
    const body = document.body;
    if(this.elementRef.nativeElement.parentElement.querySelector('#qrpopout').classList.contains("none")) {
      this.renderer.removeClass(this.elementRef.nativeElement.parentElement.querySelector('#qrpopout'), "none")
      this.renderer.setStyle(body, 'overflow', 'hidden');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement.parentElement.querySelector('#qrpopout'), "none")
      this.renderer.removeStyle(body, 'overflow');
    }
  }

  generateQRBox() {

    if (Number(this.maxNum) > 10) {
      this.num = 10;
    } else {
      this.num = Number(this.maxNum);
    }
    for(let i = 0; i < this.num; i++) {
      const qrPopout = this.renderer.createElement('div');
      const qrPopoutImg = this.renderer.createElement('img');

      const qrTree = this.renderer.createElement('div');
      const qrLogo = this.renderer.createElement('img');
      const qrText = this.renderer.createElement('span');
      const qrLink = this.renderer.createElement('a');
      const qrLinkImg = this.renderer.createElement('img');
      const qrCode = this.renderer.createElement('img');

      this.renderer.addClass(qrPopout, 'qrpopout');
      this.renderer.addClass(qrPopout, 'none');
      this.renderer.setAttribute(qrPopout, 'id', 'qrpopout');
      this.renderer.listen(qrPopout, 'click', (event) => {
        this.qrview();
      });

      this.renderer.addClass(qrPopoutImg, 'qrcodepopout');
      this.renderer.setAttribute(qrPopoutImg, 'src', this.qrCodeJson);
      this.renderer.listen(qrPopoutImg, 'click', (event) => {
        this.qrview();
      });

      this.renderer.addClass(qrTree, 'qrtree');
      this.renderer.setAttribute(qrTree, 'style', 'top: '+ (15+16.5*i) +'%;')

      this.renderer.addClass(qrLogo, 'qrlogo');
      this.renderer.setAttribute(qrLogo, 'src', this.qrLogoJson);

      this.renderer.addClass(qrText, 'qrtext');
      this.renderer.addClass(qrText, 'kanit-bold');
      this.renderer.appendChild(qrText, this.renderer.createText(this.qrTextJson));

      this.renderer.addClass(qrLink, 'qrlink');
      this.renderer.setAttribute(qrLink, 'src', this.qrLinkJson);

      this.renderer.addClass(qrLinkImg, 'qrlinkicon');
      this.renderer.setAttribute(qrLinkImg, 'src', '../../assets/img/link-svgrepo-com.svg');

      this.renderer.addClass(qrCode, 'qrcode');
      this.renderer.setAttribute(qrCode, 'src', this.qrCodeJson);
      this.renderer.listen(qrCode, 'click', (event) => {
        this.qrview();
      });

      this.renderer.appendChild(this.elementRef.nativeElement.parentElement.querySelector('#qrbox'), qrPopout);
      this.renderer.appendChild(this.elementRef.nativeElement.parentElement.querySelector('#qrbox'), qrTree);

      this.renderer.appendChild(qrPopout, qrPopoutImg);
      this.renderer.appendChild(qrTree, qrLogo);
      this.renderer.appendChild(qrTree, qrText);
      this.renderer.appendChild(qrTree, qrLink);
      this.renderer.appendChild(qrTree, qrCode);
      this.renderer.appendChild(qrLink, qrLinkImg);
    }
  }

}
