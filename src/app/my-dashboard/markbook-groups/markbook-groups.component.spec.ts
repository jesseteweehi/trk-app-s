import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkbookGroupsComponent } from './markbook-groups.component';

describe('MarkbookGroupsComponent', () => {
  let component: MarkbookGroupsComponent;
  let fixture: ComponentFixture<MarkbookGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkbookGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkbookGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
