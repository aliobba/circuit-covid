import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DssbAdminComponent } from './dssb-admin.component';

describe('DssbAdminComponent', () => {
  let component: DssbAdminComponent;
  let fixture: ComponentFixture<DssbAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DssbAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DssbAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
