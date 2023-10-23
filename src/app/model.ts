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
  onClick: (data: any) => void;
  icon?: string;
  access?: (data: any) => boolean;
}

export interface IActionBtnConfiguration {
  positions: 'start' | 'end';
  columnWidth?: string;
  buttons: IActionBtn[];
}
