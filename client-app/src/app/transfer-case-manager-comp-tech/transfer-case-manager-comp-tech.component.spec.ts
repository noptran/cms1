import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCaseManagerCompTechComponent } from './transfer-case-manager-comp-tech.component';

describe('TransferCaseManagerCompTechComponent', () => {
  let component: TransferCaseManagerCompTechComponent;
  let fixture: ComponentFixture<TransferCaseManagerCompTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferCaseManagerCompTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferCaseManagerCompTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
