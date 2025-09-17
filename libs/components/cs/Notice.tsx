import React from 'react';
import { Stack, Typography, Paper, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const Notice = () => {
  const notices = [
    {
      id: 1,
      title: 'Register to use and get discounts',
      date: '01.03.2024',
      type: 'Event',
    },
    {
      id: 2,
      title: "It's absolutely free to upload and trade properties",
      date: '31.03.2024',
      type: 'Announcement',
    },
  ];

  return (
    <Stack spacing={2}>
      {notices.map((notice) => (
        <Paper
          key={notice.id}
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            background: '#ffffff',
            transition: '0.3s',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Chip
              icon={<EventIcon />}
              label={notice.type}
              sx={{ background: '#219ebc', color: '#fff', fontWeight: 500 }}
            />
            <Typography variant="body2" sx={{ color: '#888' }}>
              {notice.date}
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, color: '#222' }}>
            {notice.title}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
};

export default Notice;
