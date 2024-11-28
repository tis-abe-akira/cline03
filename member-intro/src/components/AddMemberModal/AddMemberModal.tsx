import React, { useState, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip,
  IconButton,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Member, Tag } from '../../types';
import { useMemberContext } from '../../context/MemberContext';

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  editMember?: Member;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  open,
  onClose,
  editMember,
}) => {
  const { addMember, updateMember, tags } = useMemberContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(editMember?.name || '');
  const [introduction, setIntroduction] = useState(editMember?.introduction || '');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(editMember?.tags || []);
  const [imageUrl, setImageUrl] = useState(editMember?.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState(editMember?.imageUrl || '');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = () => {
    const memberData = {
      name,
      introduction,
      imageUrl,
      tags: selectedTags,
      isEditable: true,
    };

    if (editMember) {
      updateMember({ ...memberData, id: editMember.id });
    } else {
      addMember(memberData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editMember ? '部員情報を編集' : '部員を追加'}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 200,
              border: '2px dashed #ccc',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <IconButton>
                <CloudUploadIcon />
              </IconButton>
            )}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </Box>

          <TextField
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="自己紹介"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Autocomplete
            multiple
            options={tags}
            value={selectedTags}
            onChange={(_, newValue) => setSelectedTags(newValue)}
            getOptionLabel={(option) => option.name}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  color={
                    option.category === 'POSITION' ? 'primary' :
                    option.category === 'HOBBY' ? 'secondary' : 'default'
                  }
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="タグ" placeholder="タグを選択" />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name || !introduction || !imageUrl}
        >
          {editMember ? '更新' : '追加'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
