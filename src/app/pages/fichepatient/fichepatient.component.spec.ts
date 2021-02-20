import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichepatientComponent } from './fichepatient.component';

describe('FichepatientComponent', () => {
  let component: FichepatientComponent;
  let fixture: ComponentFixture<FichepatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichepatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
