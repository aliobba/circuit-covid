import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientbyhopComponent } from './patientbyhop.component';

describe('PatientbyhopComponent', () => {
  let component: PatientbyhopComponent;
  let fixture: ComponentFixture<PatientbyhopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientbyhopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientbyhopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
