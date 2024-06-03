import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QreditComponent } from './qredit.component';

describe('QreditComponent', () => {
  let component: QreditComponent;
  let fixture: ComponentFixture<QreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
