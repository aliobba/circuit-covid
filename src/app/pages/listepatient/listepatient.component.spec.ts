import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepatientComponent } from './listepatient.component';

describe('ListepatientComponent', () => {
  let component: ListepatientComponent;
  let fixture: ComponentFixture<ListepatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListepatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
