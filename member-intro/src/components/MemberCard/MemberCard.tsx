import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { Member } from '../../types';

interface MemberCardProps {
  member: Member;
  index: number;
  onClick: () => void;
}

const MAX_INTRODUCTION_LENGTH = 100;

export const MemberCard: React.FC<MemberCardProps> = ({ member, index, onClick }) => {
  const truncatedIntroduction = member.introduction.length > MAX_INTRODUCTION_LENGTH
    ? `${member.introduction.slice(0, MAX_INTRODUCTION_LENGTH)}...`
    : member.introduction;

  return (
    <Draggable draggableId={member.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 6,
            },
          }}
          onClick={onClick}
        >
          <Box sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, objectFit: 'cover' }}
              image={member.imageUrl}
              alt={member.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="div" gutterBottom>
                {member.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {truncatedIntroduction}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {member.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    size="small"
                    color={
                      tag.category === 'POSITION' ? 'primary' :
                      tag.category === 'HOBBY' ? 'secondary' : 'default'
                    }
                  />
                ))}
              </Box>
            </CardContent>
          </Box>
        </Card>
      )}
    </Draggable>
  );
};
