import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { LocalLibrary as LocalLibraryIcon, Tag as TagIcon } from '@mui/icons-material';
import { MemberProvider } from './context/MemberContext';
import { MemberList } from './components/MemberList/MemberList';
import { AddMemberModal } from './components/AddMemberModal/AddMemberModal';
import { MemberDetail } from './components/MemberDetail/MemberDetail';
import { TagManagement } from './components/TagManagement/TagManagement';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemberProvider>
        <AppBar position="sticky">
          <Toolbar>
            <LocalLibraryIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              部員紹介
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setIsTagManagementOpen(true)}
            >
              <TagIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <MemberList
          onAddClick={handleAddClick}
          onMemberClick={(memberId) => setSelectedMemberId(memberId)}
        />

        <AddMemberModal
          open={isAddModalOpen}
          onClose={handleCloseAddModal}
        />

        {selectedMemberId && (
          <MemberDetail
            open={!!selectedMemberId}
            onClose={() => setSelectedMemberId(null)}
            memberId={selectedMemberId}
          />
        )}

        <TagManagement
          open={isTagManagementOpen}
          onClose={() => setIsTagManagementOpen(false)}
        />
      </MemberProvider>
    </ThemeProvider>
  );
}

export default App;
