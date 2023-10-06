import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCartDetailComponent } from './dialog-cart-detail.component';

describe('DialogCartDetailComponent', () => {
  let component: DialogCartDetailComponent;
  let fixture: ComponentFixture<DialogCartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCartDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
