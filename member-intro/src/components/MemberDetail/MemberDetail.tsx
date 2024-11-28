import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  DialogContentText,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Member } from '../../types';
import { useMemberContext } from '../../context/MemberContext';
import { AddMemberModal } from '../AddMemberModal/AddMemberModal';

interface MemberDetailProps {
  open: boolean;
  onClose: () => void;
  memberId: string;
}

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>削除の確認</DialogTitle>
    <DialogContent>
      <DialogContentText>
        この部員情報を削除してもよろしいですか？
        この操作は取り消すことができません。
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>キャンセル</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        削除
      </Button>
    </DialogActions>
  </Dialog>
);

export const MemberDetail: React.FC<MemberDetailProps> = ({
  open,
  onClose,
  memberId,
}) => {
  const { members, deleteMember } = useMemberContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const member = members.find((m) => m.id === memberId);

  if (!member) return null;

  const handleDelete = () => {
    deleteMember(member.id);
    setIsDeleteDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{member.name}</Typography>
            {member.isEditable && (
              <Box>
                <IconButton onClick={() => setIsEditModalOpen(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setIsDeleteDialogOpen(true)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <img
              src={member.imageUrl}
              alt={member.name}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </Box>

          <Typography variant="body1" paragraph>
            {member.introduction}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {member.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                color={
                  tag.category === 'POSITION' ? 'primary' :
                  tag.category === 'HOBBY' ? 'secondary' : 'default'
                }
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>閉じる</Button>
        </DialogActions>
      </Dialog>

      {isEditModalOpen && (
        <AddMemberModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          editMember={member}
        />
      )}

      <DeleteConfirmation
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};
