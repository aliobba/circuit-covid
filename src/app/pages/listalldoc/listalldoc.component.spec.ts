import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListalldocComponent } from './listalldoc.component';

describe('ListalldocComponent', () => {
  let component: ListalldocComponent;
  let fixture: ComponentFixture<ListalldocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListalldocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListalldocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
