import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KippComponent } from './kipp.component';

describe('KippComponent', () => {
  let component: KippComponent;
  let fixture: ComponentFixture<KippComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KippComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KippComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
