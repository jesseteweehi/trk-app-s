import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudentResourcesComponent } from './my-student-resources.component';

describe('MyStudentResourcesComponent', () => {
  let component: MyStudentResourcesComponent;
  let fixture: ComponentFixture<MyStudentResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
