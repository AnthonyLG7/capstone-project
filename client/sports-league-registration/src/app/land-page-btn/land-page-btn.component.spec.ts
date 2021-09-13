import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPageBtnComponent } from './land-page-btn.component';

describe('LandPageBtnComponent', () => {
  let component: LandPageBtnComponent;
  let fixture: ComponentFixture<LandPageBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandPageBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandPageBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
