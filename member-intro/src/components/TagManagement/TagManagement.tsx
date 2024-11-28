import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Tag } from '../../types';
import { useMemberContext } from '../../context/MemberContext';

interface TagManagementProps {
  open: boolean;
  onClose: () => void;
}

export const TagManagement: React.FC<TagManagementProps> = ({ open, onClose }) => {
  const { tags, addTag, deleteTag } = useMemberContext();
  const [newTagName, setNewTagName] = useState('');
  const [newTagCategory, setNewTagCategory] = useState<'POSITION' | 'HOBBY' | 'OTHER'>('OTHER');

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag({
        name: newTagName.trim(),
        category: newTagCategory,
      });
      setNewTagName('');
    }
  };

  const handleDeleteTag = (tagId: string) => {
    deleteTag(tagId);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>タグ管理</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            新しいタグを追加
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="タグ名"
              size="small"
              sx={{ flex: 1 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>カテゴリー</InputLabel>
              <Select
                value={newTagCategory}
                onChange={(e) => setNewTagCategory(e.target.value as 'POSITION' | 'HOBBY' | 'OTHER')}
                label="カテゴリー"
              >
                <MenuItem value="POSITION">職位</MenuItem>
                <MenuItem value="HOBBY">趣味</MenuItem>
                <MenuItem value="OTHER">その他</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleAddTag}
              disabled={!newTagName.trim()}
            >
              追加
            </Button>
          </Box>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          既存のタグ
        </Typography>
        <List>
          {tags.map((tag) => (
            <ListItem
              key={tag.id}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                bgcolor: 'background.paper',
              }}
            >
              <ListItemText
                primary={tag.name}
                secondary={
                  tag.category === 'POSITION' ? '職位' :
                  tag.category === 'HOBBY' ? '趣味' : 'その他'
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
