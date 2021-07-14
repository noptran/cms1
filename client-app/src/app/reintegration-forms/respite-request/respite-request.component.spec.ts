import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiteRequestComponent } from './respite-request.component';

describe('RespiteRequestComponent', () => {
  let component: RespiteRequestComponent;
  let fixture: ComponentFixture<RespiteRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespiteRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespiteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
