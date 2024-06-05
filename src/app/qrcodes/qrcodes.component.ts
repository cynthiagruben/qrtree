import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qrcodes',
  standalone: true,
  imports: [],
  templateUrl: './qrcodes.component.html',
  styleUrl: './qrcodes.component.css'
})
export class QrcodesComponent {

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

  maxNum: any = 2;
  num: any = 0;

  userId: string | null = null;

  constructor(
    private dataService: DataService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
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
      this.userId = params['User'];
      console.log(this.userId);
    });
  }

  qrview(targetElement: any, number: any): void{
    const body = document.body;
    if(targetElement.parentElement.parentElement.querySelector('#qrPopout'+number).classList.contains("none")) {
      this.renderer.removeClass(targetElement.parentElement.parentElement.querySelector('#qrPopout'+number), "none")
      this.renderer.setStyle(body, 'overflow', 'hidden');
    } else {
      this.renderer.addClass(targetElement.parentElement.parentElement.querySelector('#qrPopout'+number), "none")
      this.renderer.removeStyle(body, 'overflow');
    }
  }

  toggleQRLink(targetElement: any, number: any): void{
    if(targetElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'+number).classList.contains("activ")) {
      this.renderer.setAttribute(targetElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'+number), 'src', '../../assets/img/toogle-left-svgrepo-com.svg')
      this.renderer.removeClass(targetElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'+number), 'activ')
    } else {
      this.renderer.setAttribute(targetElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'+number), 'src', '../../assets/img/toogle-right-svgrepo-com.svg')
      this.renderer.addClass(targetElement.parentElement.parentElement.querySelector('#qrDeactivatedImg'+number), 'activ')
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

      const qrEdit = this.renderer.createElement('a');
      const qrEditImg = this.renderer.createElement('img');
      const qrRemove = this.renderer.createElement('a');
      const qrRemoveImg = this.renderer.createElement('img');
      const qrDeactivated = this.renderer.createElement('div');
      const qrDeactivatedButton = this.renderer.createElement('input');
      const qrDeactivatedImg = this.renderer.createElement('img');

      this.renderer.addClass(qrPopout, 'qrpopout');
      this.renderer.addClass(qrPopout, 'none');
      this.renderer.listen(qrPopout, 'click', (event) => {
        this.qrview(qrPopout, i);
      });
      this.renderer.setAttribute(qrPopout, 'id', 'qrPopout'+i);

      this.renderer.addClass(qrPopoutImg, 'qrcodepopout');
      this.renderer.setAttribute(qrPopoutImg, 'src', this.qrCodeJson);
      this.renderer.listen(qrPopoutImg, 'click', (event) => {
        this.qrview(qrPopoutImg, i);
      });
      this.renderer.setAttribute(qrPopoutImg, 'id', 'qrPopoutImg'+i);

      this.renderer.addClass(qrTree, 'qrtree');
      this.renderer.setAttribute(qrTree, 'style', 'top: '+ (15+25*i) +'%;')
      this.renderer.setAttribute(qrTree, 'id', 'qrTree'+i);

      this.renderer.addClass(qrLogo, 'qrlogo');
      this.renderer.setAttribute(qrLogo, 'src', this.qrLogoJson);
      this.renderer.setAttribute(qrTree, 'id', 'qrTree'+i);

      this.renderer.addClass(qrText, 'qrtext');
      this.renderer.addClass(qrText, 'kanit-bold');
      this.renderer.appendChild(qrText, this.renderer.createText(this.qrTextJson));
      this.renderer.setAttribute(qrTree, 'id', 'qrTree'+i);

      this.renderer.addClass(qrLink, 'qrlink');
      this.renderer.setAttribute(qrLink, 'src', this.qrLinkJson);
      this.renderer.setAttribute(qrTree, 'id', 'qrTree'+i);

      this.renderer.addClass(qrLinkImg, 'qrlinkicon');
      this.renderer.setAttribute(qrLinkImg, 'src', '../../assets/img/link-svgrepo-com.svg');
      this.renderer.setAttribute(qrLinkImg, 'id', 'qrLinkImg'+i);

      this.renderer.addClass(qrCode, 'qrcode');
      this.renderer.setAttribute(qrCode, 'src', this.qrCodeJson);
      this.renderer.listen(qrCode, 'click', (event) => {
        this.qrview(qrCode, i);
      });
      this.renderer.setAttribute(qrCode, 'id', 'qrCode'+i);

      this.renderer.addClass(qrEdit, 'qrlink')
      this.renderer.setAttribute(qrEdit, 'href', '/qredit');
      this.renderer.setAttribute(qrEdit, 'id', 'qrEdit'+i);

      this.renderer.addClass(qrEditImg, 'qredit')
      this.renderer.setAttribute(qrEditImg, 'src', this.qrEditJson);
      this.renderer.setAttribute(qrEditImg, 'id', 'qrEditImg'+i);

      this.renderer.addClass(qrRemove, 'qrlink')
      this.renderer.setAttribute(qrRemove, 'href', '/qrremove');
      this.renderer.setAttribute(qrRemove, 'id', 'qrRemove'+i);

      this.renderer.addClass(qrRemoveImg, 'qrremove');
      this.renderer.setAttribute(qrRemoveImg, 'src', this.qrRemoveJson);
      this.renderer.setAttribute(qrRemoveImg, 'id', 'qrRemoveImg'+i);

      this.renderer.addClass(qrDeactivated, 'qrdeactivate');
      this.renderer.addClass(qrDeactivated, 'activ');
      this.renderer.setAttribute(qrDeactivated, 'id', 'qrDeactivated'+i);

      this.renderer.addClass(qrDeactivatedButton, 'qrdeactivatebutton');
      this.renderer.setAttribute(qrDeactivatedButton, 'type', 'button');
      this.renderer.setAttribute(qrDeactivatedButton, 'id', 'qrDeactivatedButton'+i);

      this.renderer.addClass(qrDeactivatedImg, 'qrdeactivateimg');
      this.renderer.setAttribute(qrDeactivatedImg, 'src', this.qrToggleJson);
      this.renderer.setAttribute(qrDeactivatedImg, 'id', 'qrDeactivatedImg'+i);
      this.renderer.listen(qrDeactivatedImg, 'click', (event) => {
        this.toggleQRLink(qrDeactivatedImg, i);
      });

      this.renderer.appendChild(this.elementRef.nativeElement.parentElement.querySelector('#qrbox'), qrPopout);
      this.renderer.appendChild(this.elementRef.nativeElement.parentElement.querySelector('#qrbox'), qrTree);

      this.renderer.appendChild(qrPopout, qrPopoutImg);
      this.renderer.appendChild(qrTree, qrLogo);
      this.renderer.appendChild(qrTree, qrText);
      this.renderer.appendChild(qrTree, qrLink);
      this.renderer.appendChild(qrTree, qrCode);
      this.renderer.appendChild(qrTree, qrEdit);
      this.renderer.appendChild(qrEdit, qrEditImg);
      this.renderer.appendChild(qrTree, qrRemove);
      this.renderer.appendChild(qrRemove, qrRemoveImg);
      this.renderer.appendChild(qrTree, qrDeactivated);
      this.renderer.appendChild(qrLink, qrLinkImg);
      this.renderer.appendChild(qrDeactivated, qrDeactivatedButton);
      this.renderer.appendChild(qrDeactivated, qrDeactivatedImg);
    }
  }
    /*this.renderer.setAttribute(itemImg, 'src', this.cart[i]?.image)
    this.renderer.setAttribute(itemRemove, 'src', 'assets/img/closeProgramm.svg')
    this.renderer.setAttribute(itemBackground, 'id', '' + i)
    this.renderer.listen(itemRemove, 'click', (event) => {
      this.removeItem(itemRemove)*/

}
