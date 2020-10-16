export class DataTableColumn<Model>{
  header: string;
  cell: (element: Model) => any;
  cellColor?: (element: Model) => '';
}
