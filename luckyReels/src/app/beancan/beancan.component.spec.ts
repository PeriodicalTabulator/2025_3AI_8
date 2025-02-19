import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeancanComponent } from './beancan.component';

describe('BeancanComponent', () => {
  let component: BeancanComponent;
  let fixture: ComponentFixture<BeancanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeancanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeancanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
