import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsDetailsComponent } from './sports-details.component';

describe('SportsDetailsComponent', () => {
  let component: SportsDetailsComponent;
  let fixture: ComponentFixture<SportsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
