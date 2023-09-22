import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableListComponent } from './mat-table-list.component';

describe('MatTableListComponent', () => {
  let component: MatTableListComponent;
  let fixture: ComponentFixture<MatTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
