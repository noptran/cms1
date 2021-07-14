import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSchoolComponent } from './provider-school.component';

describe('ProviderSchoolComponent', () => {
  let component: ProviderSchoolComponent;
  let fixture: ComponentFixture<ProviderSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
