import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailQuestionaireComponent } from './email-questionaire.component';

describe('EmailQuestionaireComponent', () => {
  let component: EmailQuestionaireComponent;
  let fixture: ComponentFixture<EmailQuestionaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailQuestionaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailQuestionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
