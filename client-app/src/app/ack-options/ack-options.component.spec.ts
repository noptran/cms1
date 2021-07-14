import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckOptionsComponent } from './ack-options.component';

describe('AckOptionsComponent', () => {
  let component: AckOptionsComponent;
  let fixture: ComponentFixture<AckOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
