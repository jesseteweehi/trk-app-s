import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentGroupExpPanelComponent } from './my-student-group-exp-panel.component';

describe('MyStudentGroupExpPanelComponent', () => {
  let component: MyStudentGroupExpPanelComponent;
  let fixture: ComponentFixture<MyStudentGroupExpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentGroupExpPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentGroupExpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
