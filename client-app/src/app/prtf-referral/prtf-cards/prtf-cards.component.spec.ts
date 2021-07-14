import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrtfCardsComponent } from './prtf-cards.component';

describe('PrtfCardsComponent', () => {
  let component: PrtfCardsComponent;
  let fixture: ComponentFixture<PrtfCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrtfCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrtfCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
