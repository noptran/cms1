import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiblingsInoutHomeComponent } from './siblings-inout-home.component';

describe('SiblingsInoutHomeComponent', () => {
  let component: SiblingsInoutHomeComponent;
  let fixture: ComponentFixture<SiblingsInoutHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiblingsInoutHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiblingsInoutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
