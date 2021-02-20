import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenoncontacterComponent } from './listenoncontacter.component';

describe('ListenoncontacterComponent', () => {
  let component: ListenoncontacterComponent;
  let fixture: ComponentFixture<ListenoncontacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenoncontacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenoncontacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
