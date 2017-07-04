import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentContainerComponent } from './my-student-container.component';

describe('MyStudentContainerComponent', () => {
  let component: MyStudentContainerComponent;
  let fixture: ComponentFixture<MyStudentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
