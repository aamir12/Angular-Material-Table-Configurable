# Fully Configurable - Angular Material Table

## Demo

[Demo ⚡️](https://stackblitz.com/edit/ck4y6t)

## Features

- Fully Type Safe
- Custom Filtration
- Custom Sorting
- Disable Specific Columns Sorting
- Configurable Columns
- Apply Multiple Columns Filtration by using custom function
- Columns Data Transfomation
- Custom Columns width
- Responsive Table
- Action Buttons
- Action Button width and position
- Pagination and Page Size
- Row Click handler

## API Reference

```http
  <app-mat-table-list
  [data]="data"
  [columns]="columns"
  [filterValue]="filterValue"
  [filterFn]="filterFN"
  [sortFn]="sortFn"
  [rowClickListner]="onRowClick"
  [actionBtns]="actionBtns"
  [pageSize]="5"
></app-mat-table-list>

```

| Parameter         | Description                                    |
| :---------------- | :--------------------------------------------- |
| `data`            | **Required** Actual Data                       |
| `columns`         | **Required** Columns Defination                |
| `filterValue`     | Filter value must be string                    |
| `filterFn`        | Custom Filter Function                         |
| `sortFn`          | Custom Sorting Function                        |
| `rowClickListner` | Row Click Handler Function                     |
| `actionBtns`      | Action Columns Setting and function definition |
| `pageSize`        | Number of pages to be display                  |

#### Made By Aamir Khan

Thank You!! 😄
