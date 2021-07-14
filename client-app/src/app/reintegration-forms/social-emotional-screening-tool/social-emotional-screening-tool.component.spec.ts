import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEmotionalScreeningToolComponent } from './social-emotional-screening-tool.component';

describe('SocialEmotionalScreeningToolComponent', () => {
  let component: SocialEmotionalScreeningToolComponent;
  let fixture: ComponentFixture<SocialEmotionalScreeningToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEmotionalScreeningToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEmotionalScreeningToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
