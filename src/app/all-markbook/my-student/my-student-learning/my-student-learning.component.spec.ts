import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentLearningComponent } from './my-student-learning.component';

describe('MyStudentLearningComponent', () => {
  let component: MyStudentLearningComponent;
  let fixture: ComponentFixture<MyStudentLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
