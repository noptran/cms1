import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCaseFileActivityComponent } from './provider-case-file-activity.component';

describe('ProviderCaseFileActivityComponent', () => {
  let component: ProviderCaseFileActivityComponent;
  let fixture: ComponentFixture<ProviderCaseFileActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCaseFileActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCaseFileActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
