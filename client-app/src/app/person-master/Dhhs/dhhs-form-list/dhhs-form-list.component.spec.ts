import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhhsFormListComponent } from './dhhs-form-list.component';

describe('DhhsFormListComponent', () => {
  let component: DhhsFormListComponent;
  let fixture: ComponentFixture<DhhsFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhhsFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhhsFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
