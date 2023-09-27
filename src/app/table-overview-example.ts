import { Component, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { IActionBtnConfiguration, IColumn, IUserData } from './model';
import { createNewUser } from './data';
import { WINDOW } from './window.service';

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
      style: '10%',
    },
    {
      name: 'name',
      disableSorting: false,
      displayName: 'Name',
      style: '20%',
      transForm: (value: string) => {
        return value.toLowerCase();
      },
    },
    {
      name: 'fruit',
      disableSorting: false,
      displayName: 'Fruit',
      style: '20%',
      transForm: (value: string) => value.toUpperCase(),
    },
  ];

  actionBtns: IActionBtnConfiguration = {
    positions: 'start',
    columnWidth: '10%',
    buttons: [
      {
        name: 'View',
        onClick: this.onView,
        icon: 'visibility',
      },
      {
        name: 'Edit',
        onClick: this.onEdit,
        icon: 'edit',
      },
      {
        name: 'Delete',
        onClick: this.onDelete,
        icon: 'delete',
      },
    ],
  };

  //Window object wrapper
  constructor(@Inject(WINDOW) private window: Window) {
    // setTimeout(() => {
    //   this.window.alert("Hi...")
    // }, 3000);

    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
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
  }

  onView(row: IUserData) {
    console.log('On View', row);
  }

  onDelete(row: IUserData) {
    console.log('On Delete', row);
  }

  //Custom Sorting Function
  sortFn = (items: IUserData[], sort: MatSort): IUserData[] => {
    if (!sort.active || sort.direction === '') {
      return items;
    }

    console.log('Custom Sorting');
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
  };
}
