import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentEnrolledComponent } from './my-student-enrolled.component';

describe('MyStudentEnrolledComponent', () => {
  let component: MyStudentEnrolledComponent;
  let fixture: ComponentFixture<MyStudentEnrolledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentEnrolledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
