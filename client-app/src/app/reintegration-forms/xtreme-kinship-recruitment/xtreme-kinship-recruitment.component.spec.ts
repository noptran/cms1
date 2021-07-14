import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XtremeKinshipRecruitmentComponent } from './xtreme-kinship-recruitment.component';

describe('XtremeKinshipRecruitmentComponent', () => {
  let component: XtremeKinshipRecruitmentComponent;
  let fixture: ComponentFixture<XtremeKinshipRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XtremeKinshipRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XtremeKinshipRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
