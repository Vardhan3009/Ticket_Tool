import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parentcategory } from './parentcategory';

describe('Parentcategory', () => {
  let component: Parentcategory;
  let fixture: ComponentFixture<Parentcategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parentcategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parentcategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
