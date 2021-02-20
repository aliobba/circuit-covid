import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocbyhopComponent } from './docbyhop.component';

describe('DocbyhopComponent', () => {
  let component: DocbyhopComponent;
  let fixture: ComponentFixture<DocbyhopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocbyhopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocbyhopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
