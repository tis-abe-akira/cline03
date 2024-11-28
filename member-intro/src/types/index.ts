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

// DragDropResultの型定義を削除（react-beautiful-dndの型を直接使用）
