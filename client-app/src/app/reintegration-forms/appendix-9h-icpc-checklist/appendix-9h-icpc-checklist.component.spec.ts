import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Appendix9hIcpcChecklistComponent } from './appendix-9h-icpc-checklist.component';

describe('Appendix9hIcpcChecklistComponent', () => {
  let component: Appendix9hIcpcChecklistComponent;
  let fixture: ComponentFixture<Appendix9hIcpcChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Appendix9hIcpcChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Appendix9hIcpcChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
