import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateCourseComponent } from './dialog-create-course.component';

describe('DialogCreateCourseComponent', () => {
  let component: DialogCreateCourseComponent;
  let fixture: ComponentFixture<DialogCreateCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
