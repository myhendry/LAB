export interface IThing {
  id: string;
  name: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}
