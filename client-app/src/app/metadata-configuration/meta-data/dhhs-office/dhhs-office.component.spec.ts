import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhhsOfficeComponent } from './dhhs-office.component';

describe('DhhsOfficeComponent', () => {
  let component: DhhsOfficeComponent;
  let fixture: ComponentFixture<DhhsOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhhsOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhhsOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
