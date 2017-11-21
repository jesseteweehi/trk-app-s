import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentEnrolledExpPanelComponent } from './my-student-enrolled-exp-panel.component';

describe('MyStudentEnrolledExpPanelComponent', () => {
  let component: MyStudentEnrolledExpPanelComponent;
  let fixture: ComponentFixture<MyStudentEnrolledExpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentEnrolledExpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentEnrolledExpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
