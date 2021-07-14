import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JjfcComponent } from './jjfc.component';

describe('JjfcComponent', () => {
  let component: JjfcComponent;
  let fixture: ComponentFixture<JjfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JjfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JjfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
