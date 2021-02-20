import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutresinterComponent } from './ajoutresinter.component';

describe('AjoutresinterComponent', () => {
  let component: AjoutresinterComponent;
  let fixture: ComponentFixture<AjoutresinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutresinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutresinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
