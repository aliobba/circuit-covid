import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutsurveyComponent } from './ajoutsurvey.component';

describe('AjoutsurveyComponent', () => {
  let component: AjoutsurveyComponent;
  let fixture: ComponentFixture<AjoutsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutsurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
