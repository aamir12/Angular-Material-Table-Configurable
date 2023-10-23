export interface IUserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface Style {
  [key: string]: string;
}

export interface IColumn {
  name: string;
  disableSorting?: boolean;
  displayName: string;
  headerStyle?: Style;
  dataStyle?: Style;
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
  style?: Style;
  buttons: IActionBtn<T>[];
}
