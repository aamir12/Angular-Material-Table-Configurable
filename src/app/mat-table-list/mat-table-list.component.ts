import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IActionBtnConfiguration, IColumn } from '../model';

@Component({
  selector: 'app-mat-table-list',
  templateUrl: './mat-table-list.component.html',
  styleUrls: ['./mat-table-list.component.scss'],
})
export class MatTableListComponent<T> implements OnInit, AfterViewInit {
  @Input() data: T[] = [];
  @Input() filterValue: string = '';
  @Input() pageSize: number = 5;
  @Input() columns: IColumn[] = [];
  @Input() rowClickListner!: (data: T) => void;
  @Input() filterFn!: (data: T, filter: string) => boolean;
  @Input() sortFn!: (data: T[], sort: MatSort) => T[];
  actionColumnWidth: string = '5%';

  //need to work on action btns
  @Input() actionBtns!: IActionBtnConfiguration;

  dataSource!: MatTableDataSource<T>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // console.log(this.columns);
  displayedColumns: string[] = [];

  ngOnInit() {
    const displayedCols = this.columns.map((x) => x.name);

    if (!!this.actionBtns) {
      this.actionColumnWidth =
        this.actionBtns.columnWidth || this.actionColumnWidth;
      this.displayedColumns =
        this.actionBtns.positions === 'start'
          ? ['action', ...displayedCols]
          : [...displayedCols, 'action'];
    } else {
      this.displayedColumns = displayedCols;
    }

    this.dataSource = new MatTableDataSource(this.data);
    this.filterDefinition();
    this.sortDefinition();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.filterDefinition();
      this.sortDefinition();
    }

    if (changes['filterValue']) {
      this.applyFilter();
    }
  }

  filterDefinition() {
    if (this.filterFn) {
      this.dataSource.filterPredicate = this.filterFn;
    }
  }

  sortDefinition() {
    if (this.sortFn) {
      this.dataSource.sortData = this.sortFn;
    }
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClick(row: T) {
    if (this.rowClickListner) {
      this.rowClickListner(row);
    }
  }

  onOptionClick(event: Event) {
    event.stopPropagation();
  }
}

// class="mat-focus-indicator mat-menu-trigger mat-icon-button mat-button-base"
