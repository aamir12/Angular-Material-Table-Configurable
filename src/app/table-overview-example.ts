import { Component } from '@angular/core';
import { MatSort } from '@angular/material/sort';
export interface IUserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface IColumn {
  name: string;
  disableSorting?: boolean;
  displayName: string;
  style?: string;
  transForm?: (value: string) => string;
}

export interface IActionBtn {
  name: string;
  onClick: (data: IUserData) => void;
  icon?: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

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

  actionBtns = [
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
  ];

  onEdit(row: IUserData) {
    console.log('On Edit', row);
  }

  onView(row: IUserData) {
    console.log('On View', row);
  }

  onDelete(row: IUserData) {
    console.log('On Delete', row);
  }

  filterFN = (data: IUserData, filter: string): boolean => {
    return data.name.toLowerCase().includes(filter.toLowerCase());
  };

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

  filterFN1 = (data: IUserData, filter: string): boolean => {
    return data.fruit.toLowerCase().includes(filter.toLowerCase());
  };

  onRowClick = (data: IUserData) => {
    console.log('Row Click');
    console.log(data);
  };

  constructor() {
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
}

/** Builds and returns a new User. */
function createNewUser(id: number): IUserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
