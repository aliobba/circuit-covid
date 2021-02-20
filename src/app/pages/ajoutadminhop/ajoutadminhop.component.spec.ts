import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutadminhopComponent } from './ajoutadminhop.component';

describe('AjoutadminhopComponent', () => {
  let component: AjoutadminhopComponent;
  let fixture: ComponentFixture<AjoutadminhopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutadminhopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutadminhopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
