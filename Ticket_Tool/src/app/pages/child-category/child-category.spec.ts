import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategory } from './child-category';

describe('ChildCategory', () => {
  let component: ChildCategory;
  let fixture: ComponentFixture<ChildCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
