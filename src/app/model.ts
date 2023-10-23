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

export interface IActionBtn {
  name: string;
  onClick: (data: IUserData) => void;
  icon?: string;
}

export interface IActionBtnConfiguration {
  positions: 'start' | 'end';
  columnWidth?: string;
  buttons: IActionBtn[];
}
