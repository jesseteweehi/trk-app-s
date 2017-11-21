import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentInputComponent } from './my-student-input.component';

describe('MyStudentInputComponent', () => {
  let component: MyStudentInputComponent;
  let fixture: ComponentFixture<MyStudentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
