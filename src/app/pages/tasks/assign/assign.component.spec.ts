import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignComponent } from './assign.component';

describe('AssignComponent', () => {
  let component: AssignComponent;
  let fixture: ComponentFixture<AssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
