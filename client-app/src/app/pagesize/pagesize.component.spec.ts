import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesizeComponent } from './pagesize.component';

describe('PagesizeComponent', () => {
  let component: PagesizeComponent;
  let fixture: ComponentFixture<PagesizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
