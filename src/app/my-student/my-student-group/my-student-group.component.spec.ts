import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentGroupComponent } from './my-student-group.component';

describe('MyStudentGroupComponent', () => {
  let component: MyStudentGroupComponent;
  let fixture: ComponentFixture<MyStudentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
