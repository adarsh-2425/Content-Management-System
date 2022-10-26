import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteDialogComponent } from './promote-dialog.component';

describe('PromoteDialogComponent', () => {
  let component: PromoteDialogComponent;
  let fixture: ComponentFixture<PromoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
