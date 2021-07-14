import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafasComponent } from './cafas.component';

describe('CafasComponent', () => {
  let component: CafasComponent;
  let fixture: ComponentFixture<CafasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
