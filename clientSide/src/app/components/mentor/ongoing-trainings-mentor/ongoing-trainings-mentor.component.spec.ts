import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingTrainingsMentorComponent } from './ongoing-trainings-mentor.component';

describe('OngoingTrainingsMentorComponent', () => {
  let component: OngoingTrainingsMentorComponent;
  let fixture: ComponentFixture<OngoingTrainingsMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingTrainingsMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingTrainingsMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
