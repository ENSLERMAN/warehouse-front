import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispatchComponent } from './create-dispatch.component';

describe('CreateDispatchComponent', () => {
  let component: CreateDispatchComponent;
  let fixture: ComponentFixture<CreateDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
