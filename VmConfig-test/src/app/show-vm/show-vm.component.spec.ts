import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVMComponent } from './show-vm.component';

describe('ShowVMComponent', () => {
  let component: ShowVMComponent;
  let fixture: ComponentFixture<ShowVMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowVMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
