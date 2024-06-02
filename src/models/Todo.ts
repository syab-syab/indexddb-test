export interface Todo {
  // ?は省略可能なプロパティに付けるらしい
  id?: number;
  task: string;
  completed: boolean;
}