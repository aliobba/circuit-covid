import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallresComponent } from './listallres.component';

describe('ListallresComponent', () => {
  let component: ListallresComponent;
  let fixture: ComponentFixture<ListallresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
