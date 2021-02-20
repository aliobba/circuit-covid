import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhopComponent } from './listhop.component';

describe('ListhopComponent', () => {
  let component: ListhopComponent;
  let fixture: ComponentFixture<ListhopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListhopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListhopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
