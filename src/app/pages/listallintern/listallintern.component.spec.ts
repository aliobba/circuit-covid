import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallinternComponent } from './listallintern.component';

describe('ListallinternComponent', () => {
  let component: ListallinternComponent;
  let fixture: ComponentFixture<ListallinternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallinternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallinternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
