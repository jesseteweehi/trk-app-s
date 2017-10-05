import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDashboardContainerComponent } from './my-dashboard-container.component';

describe('MyDashboardContainerComponent', () => {
  let component: MyDashboardContainerComponent;
  let fixture: ComponentFixture<MyDashboardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDashboardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
