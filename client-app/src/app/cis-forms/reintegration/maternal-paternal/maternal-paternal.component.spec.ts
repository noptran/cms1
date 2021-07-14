import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternalPaternalComponent } from './maternal-paternal.component';

describe('MaternalPaternalComponent', () => {
  let component: MaternalPaternalComponent;
  let fixture: ComponentFixture<MaternalPaternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternalPaternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternalPaternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
