export interface Member {
  id: string;
  name: string;
  imageUrl: string;
  introduction: string;
  tags: Tag[];
  isEditable: boolean;
}

export interface Tag {
  id: string;
  name: string;
  category: 'POSITION' | 'HOBBY' | 'OTHER';
}

export interface DragDropResult {
  source: {
    index: number;
  };
  destination?: {
    index: number;
  };
}
