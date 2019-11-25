import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorPaymentsHistoryComponent } from './mentor-payments-history.component';

describe('MentorPaymentsHistoryComponent', () => {
  let component: MentorPaymentsHistoryComponent;
  let fixture: ComponentFixture<MentorPaymentsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorPaymentsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorPaymentsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
