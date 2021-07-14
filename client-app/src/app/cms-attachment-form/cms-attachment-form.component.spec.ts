import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAttachmentFormComponent } from './cms-attachment-form.component';

describe('CmsAttachmentFormComponent', () => {
  let component: CmsAttachmentFormComponent;
  let fixture: ComponentFixture<CmsAttachmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAttachmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAttachmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
