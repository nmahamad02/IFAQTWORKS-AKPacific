import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsDetailsComponent } from './quotations-details.component';

describe('QuotationsDetailsComponent', () => {
  let component: QuotationsDetailsComponent;
  let fixture: ComponentFixture<QuotationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
