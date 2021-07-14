import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcfListComponent } from './dcf-list.component';

describe('DcfListComponent', () => {
  let component: DcfListComponent;
  let fixture: ComponentFixture<DcfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
