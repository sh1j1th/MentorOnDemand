import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTrainingsMentorComponent } from './completed-trainings-mentor.component';

describe('CompletedTrainingsMentorComponent', () => {
  let component: CompletedTrainingsMentorComponent;
  let fixture: ComponentFixture<CompletedTrainingsMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTrainingsMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTrainingsMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
