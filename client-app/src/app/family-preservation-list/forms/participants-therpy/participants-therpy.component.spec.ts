import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsTherpyComponent } from './participants-therpy.component';

describe('ParticipantsTherpyComponent', () => {
  let component: ParticipantsTherpyComponent;
  let fixture: ComponentFixture<ParticipantsTherpyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsTherpyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsTherpyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
