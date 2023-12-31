import { Component, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { IActionBtnConfiguration, IColumn, IUserData } from './model';
import { createNewUser } from './data';
import { WINDOW } from './window.service';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
})
export class TableOverviewExample {
  data: IUserData[] = [];
  data1: IUserData[] = [];
  filterValue = '';
  textSearch = '';

  //Define column configuation
  //transForm,style,disableSorting are optional

  columns: IColumn[] = [
    {
      name: 'id',
      disableSorting: true,
      displayName: 'ID',
      headerStyle: { width: '10%' },
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
    },
    {
      name: 'name',
      disableSorting: false,
      displayName: 'Name',
      headerStyle: { width: '20%', backgroundColor: '#ff0000', color: '#fff' },
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
      transForm: (value: any) => {
        return value.toLowerCase();
      },
    },
    {
      name: 'fruit',
      disableSorting: false,
      displayName: 'Fruit',
      headerStyle: { width: '20%' },
      dataStyle: { background: '#000', color: '#fff' },
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
      transForm: (value: any) => value.toUpperCase(),
    },
    {
      name: 'price',
      disableSorting: false,
      displayName: 'Price',
      headerClasses: ['text-center'],
      dataClasses: ['text-center'],
      transForm: (value: string) =>
        this.currencyPipe.transform(value, 'EUR', 'symbol'),
    },
  ];

  actionBtns: IActionBtnConfiguration<IUserData> = {
    positions: 'start',
    headerStyle: {
      width: '5%',
    },
    headerClasses: ['text-center'],
    dataStyle: {
      backgroundColor: '#f1f1f1',
    },
    dataClasses: ['text-center'],
    buttons: [
      {
        name: 'View',
        onClick: this.onView.bind(this),
        icon: 'visibility',
        access: this.canView.bind(this),
      },
      {
        name: 'Edit',
        onClick: this.onEdit.bind(this),
        icon: 'edit',
        access: this.canEdit.bind(this),
      },
      {
        name: 'Delete',
        onClick: this.onDelete.bind(this),
        icon: 'delete',
        access: this.canDelete.bind(this),
      },
    ],
  };

  //to check access of variables;
  testVar: string = 'test variables';

  //Window object wrapper
  constructor(
    @Inject(WINDOW) private window: Window,
    private currencyPipe: CurrencyPipe
  ) {
    // setTimeout(() => {
    //   this.window.alert("Hi...")
    // }, 3000);

    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // console.log(JSON.stringify(users, null, 2));
    this.data = users;

    //after api calling testing
    setTimeout(() => {
      this.data1 = users;
    }, 2000);
  }

  //this will useful, If we want to filter by multiple fields
  //We just need to use JSON.stringify({field:value})
  applyFilter() {
    this.filterValue = this.textSearch;
  }

  //Action Functions
  onEdit(row: IUserData) {
    console.log('On Edit', row);
    console.log(this.testVar);
  }

  onView(row: IUserData) {
    console.log('On View', row);
    console.log(this.testVar);
  }

  onDelete(row: IUserData) {
    console.log('On Delete', row);
  }

  canView(row: IUserData) {
    return true;
  }

  canEdit(row: IUserData) {
    return true;
  }

  canDelete(row: IUserData) {
    return true;
  }

  //Custom Sorting Function
  sortFn = (items: IUserData[], sort: MatSort): IUserData[] => {
    if (!sort.active || sort.direction === '') {
      return items;
    }

    console.log('Custom Sorting');
    console.log(this.testVar);
    return items.sort((a, b) => {
      let comparatorResult = 0;
      switch (sort.active) {
        case 'name':
          comparatorResult = a.name.localeCompare(b.name);
          break;
        case 'fruit':
          comparatorResult = a.fruit.localeCompare(b.fruit);
          break;
        default:
          comparatorResult = a.name.localeCompare(b.name);
          break;
      }
      return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
    });
  };

  //We can build your complex logic
  // sortFN = (items: any[], sort: MatSort): any[] => {
  //   if (!sort.active || sort.direction === '') {
  //     return items;
  //   }

  //   return items.sort((a: any, b: any) => {
  //     let comparatorResult = 0;
  //     switch (sort.active) {
  //       case 'name':
  //         comparatorResult = a.name.localeCompare(b.name);
  //         break;
  //       case 'class':
  //         comparatorResult = a.class.localeCompare(b.class);
  //         break;
  //       case 'section':
  //         comparatorResult = a.section.localeCompare(b.section);
  //         break;
  //       case 'subjects':
  //         comparatorResult = a.subjects.length - b.subjects.length;
  //         break;
  //       case 'marks':
  //         comparatorResult =
  //           a.marks.reduce((prev:any, curr:any) => prev + curr) / a.marks.length -
  //           b.marks.reduce((prev:any, curr:any) => prev + curr) / b.marks.length;
  //         break;
  //       default:
  //         comparatorResult = a.name.localeCompare(b.name);
  //         break;
  //     }
  //     return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
  //   });
  // };

  //Custom Filter Function
  filterFN1 = (data: IUserData, filter: string): boolean => {
    return data.fruit.toLowerCase().includes(filter.toLowerCase());
  };

  filterFN = (data: IUserData, filter: string): boolean => {
    return data.name.toLowerCase().includes(filter.toLowerCase());
  };

  // On Row Click
  onRowClick = (data: IUserData) => {
    console.log('Row Click');
    console.log(data);
    console.log(this.testVar);
  };

  clearFilter() {
    this.textSearch = '';
    this.applyFilter();
  }
}
