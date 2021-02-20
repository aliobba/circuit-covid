import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallpatientComponent } from './listallpatient.component';

describe('ListallpatientComponent', () => {
  let component: ListallpatientComponent;
  let fixture: ComponentFixture<ListallpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
