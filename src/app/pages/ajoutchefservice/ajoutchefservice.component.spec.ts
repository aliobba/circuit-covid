import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutchefserviceComponent } from './ajoutchefservice.component';

describe('AjoutchefserviceComponent', () => {
  let component: AjoutchefserviceComponent;
  let fixture: ComponentFixture<AjoutchefserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutchefserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutchefserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
