import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishComponentComponent } from './add-dish-component.component';

describe('AddDishComponentComponent', () => {
  let component: AddDishComponentComponent;
  let fixture: ComponentFixture<AddDishComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDishComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDishComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
