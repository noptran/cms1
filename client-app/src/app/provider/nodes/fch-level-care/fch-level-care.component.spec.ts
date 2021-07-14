import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FchLevelCareComponent } from './fch-level-care.component';

describe('FchLevelCareComponent', () => {
  let component: FchLevelCareComponent;
  let fixture: ComponentFixture<FchLevelCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FchLevelCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FchLevelCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
