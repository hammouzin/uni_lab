import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVMComponent } from './add-vm.component';

describe('AddVMComponent', () => {
  let component: AddVMComponent;
  let fixture: ComponentFixture<AddVMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
