export interface Note {
  id: string;
  text: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
  };
}
