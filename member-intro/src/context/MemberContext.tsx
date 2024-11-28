import React, { createContext, useContext, useState, useCallback } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Member, Tag } from '../types';

interface MemberContextType {
  members: Member[];
  tags: Tag[];
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  deleteTag: (id: string) => void;
  reorderMembers: (result: DropResult) => void;
}

// Sample data
const initialTags: Tag[] = [
  { id: '1', name: '部長', category: 'POSITION' },
  { id: '2', name: '副部長', category: 'POSITION' },
  { id: '3', name: 'プログラミング', category: 'HOBBY' },
  { id: '4', name: 'デザイン', category: 'HOBBY' },
];

const initialMembers: Member[] = [
  {
    id: '1',
    name: '山田太郎',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwN2JmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgwIiBmaWxsPSJ3aGl0ZSI+VDwvdGV4dD48L3N2Zz4=',
    introduction: 'プログラミングが大好きな部長です。主にフロントエンド開発を担当しています。新しい技術を学ぶことが趣味で、休日はハッカソンに参加したりしています。',
    tags: [initialTags[0], initialTags[2]],
    isEditable: true,
  },
  {
    id: '2',
    name: '佐藤花子',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1MDA1NyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgwIiBmaWxsPSJ3aGl0ZSI+SDwvdGV4dD48L3N2Zz4=',
    introduction: 'UIデザインを担当している副部長です。ユーザー体験を大切にしたデザインを心がけています。趣味は写真撮影で、部の広報活動も担当しています。',
    tags: [initialTags[1], initialTags[3]],
    isEditable: true,
  },
];

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const addMember = useCallback((newMember: Omit<Member, 'id'>) => {
    setMembers(prev => [...prev, { ...newMember, id: crypto.randomUUID() }]);
  }, []);

  const updateMember = useCallback((updatedMember: Member) => {
    setMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
  }, []);

  const deleteMember = useCallback((id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  const addTag = useCallback((newTag: Omit<Tag, 'id'>) => {
    setTags(prev => [...prev, { ...newTag, id: crypto.randomUUID() }]);
  }, []);

  const deleteTag = useCallback((id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
    setMembers(prev => prev.map(member => ({
      ...member,
      tags: member.tags.filter(tag => tag.id !== id)
    })));
  }, []);

  const reorderMembers = useCallback((result: DropResult) => {
    if (!result.destination) return;

    setMembers(prev => {
      const items = Array.from(prev);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination!.index, 0, reorderedItem);
      return items;
    });
  }, []);

  return (
    <MemberContext.Provider value={{
      members,
      tags,
      addMember,
      updateMember,
      deleteMember,
      addTag,
      deleteTag,
      reorderMembers,
    }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};
