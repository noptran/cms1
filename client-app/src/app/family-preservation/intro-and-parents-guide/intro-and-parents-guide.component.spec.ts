import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroAndParentsGuideComponent } from './intro-and-parents-guide.component';

describe('IntroAndParentsGuideComponent', () => {
  let component: IntroAndParentsGuideComponent;
  let fixture: ComponentFixture<IntroAndParentsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroAndParentsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroAndParentsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
