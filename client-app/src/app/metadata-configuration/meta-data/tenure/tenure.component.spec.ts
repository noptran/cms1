import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenureComponent } from './tenure.component';

describe('TenureComponent', () => {
  let component: TenureComponent;
  let fixture: ComponentFixture<TenureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
