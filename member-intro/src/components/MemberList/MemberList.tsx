import React from 'react';
import { Box, Container, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { MemberCard } from '../MemberCard/MemberCard';
import { useMemberContext } from '../../context/MemberContext';

interface MemberListProps {
  onAddClick: () => void;
  onMemberClick: (memberId: string) => void;
}

export const MemberList: React.FC<MemberListProps> = ({
  onAddClick,
  onMemberClick,
}) => {
  const { members, reorderMembers } = useMemberContext();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderMembers(result);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, position: 'relative', minHeight: '100vh' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="members-list">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {members.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  onClick={() => onMemberClick(member.id)}
                />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={onAddClick}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};
