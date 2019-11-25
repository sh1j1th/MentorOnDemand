import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechDialogComponent } from './edit-tech-dialog.component';

describe('EditTechDialogComponent', () => {
  let component: EditTechDialogComponent;
  let fixture: ComponentFixture<EditTechDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTechDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
