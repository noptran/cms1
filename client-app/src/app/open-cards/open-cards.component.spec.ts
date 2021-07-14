import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCardsComponent } from './open-cards.component';

describe('OpenCardsComponent', () => {
  let component: OpenCardsComponent;
  let fixture: ComponentFixture<OpenCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
