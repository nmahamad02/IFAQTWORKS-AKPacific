import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersDetailsComponent } from './suppliers-details.component';

describe('SuppliersDetailsComponent', () => {
  let component: SuppliersDetailsComponent;
  let fixture: ComponentFixture<SuppliersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
