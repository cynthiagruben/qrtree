import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrviewComponent } from './qrview.component';

describe('QrviewComponent', () => {
  let component: QrviewComponent;
  let fixture: ComponentFixture<QrviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
