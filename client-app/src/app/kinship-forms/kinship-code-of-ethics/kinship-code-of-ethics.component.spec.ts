import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KinshipCodeOfEthicsComponent } from './kinship-code-of-ethics.component';

describe('KinshipCodeOfEthicsComponent', () => {
  let component: KinshipCodeOfEthicsComponent;
  let fixture: ComponentFixture<KinshipCodeOfEthicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KinshipCodeOfEthicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KinshipCodeOfEthicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
