import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyResourceComponent } from './identify-resource.component';

describe('IdentifyResourceComponent', () => {
  let component: IdentifyResourceComponent;
  let fixture: ComponentFixture<IdentifyResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
