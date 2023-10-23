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
  classes?: string[];
}

export interface IActionBtn<T> {
  name: string;
  onClick: (data: T) => void;
  icon?: string;
  access?: (data: T) => boolean;
}

export interface IActionBtnConfiguration<T> {
  positions: 'start' | 'end';
  columnWidth?: string;
  buttons: IActionBtn<T>[];
}
