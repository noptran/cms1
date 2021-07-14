import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcfasComponent } from './ncfas.component';

describe('NcfasComponent', () => {
  let component: NcfasComponent;
  let fixture: ComponentFixture<NcfasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcfasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
