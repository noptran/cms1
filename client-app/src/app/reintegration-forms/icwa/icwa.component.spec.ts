import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ICWAComponent } from './icwa.component';

describe('ICWAComponent', () => {
  let component: ICWAComponent;
  let fixture: ComponentFixture<ICWAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ICWAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ICWAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
