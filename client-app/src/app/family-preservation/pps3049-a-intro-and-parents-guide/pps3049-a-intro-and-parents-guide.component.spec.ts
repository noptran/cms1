import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pps3049AIntroAndParentsGuideComponent } from './pps3049-a-intro-and-parents-guide.component';

describe('Pps3049AIntroAndParentsGuideComponent', () => {
  let component: Pps3049AIntroAndParentsGuideComponent;
  let fixture: ComponentFixture<Pps3049AIntroAndParentsGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pps3049AIntroAndParentsGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pps3049AIntroAndParentsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
