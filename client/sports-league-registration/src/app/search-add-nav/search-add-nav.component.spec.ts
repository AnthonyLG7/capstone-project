import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddNavComponent } from './search-add-nav.component';

describe('SearchAddNavComponent', () => {
  let component: SearchAddNavComponent;
  let fixture: ComponentFixture<SearchAddNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAddNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAddNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
