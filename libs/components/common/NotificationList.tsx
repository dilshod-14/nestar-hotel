import { useQuery, gql } from '@apollo/client';
import { Badge, IconButton, Paper, Stack, Typography, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';

const GET_MY_NOTIFICATIONS = gql`
  query {
    getMyNotifications {
      _id
      notificationTitle
      notificationDesc
      notificationStatus
      createdAt
    }
  }
`;

const NotificationBell = () => {
  const { data } = useQuery(GET_MY_NOTIFICATIONS, { pollInterval: 10000 });
  const [open, setOpen] = useState(false);

  const notifications = data?.getMyNotifications?.slice(0, 5) ?? [];
  const unreadCount = data?.getMyNotifications?.filter((n: any) => n.notificationStatus === 'WAIT').length ?? 0;

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Badge badgeContent={unreadCount} color="error">
        <IconButton>
          <NotificationsIcon sx={{ color: '#444' }} />
        </IconButton>
      </Badge>

      {open && (
        <Paper
          sx={{
            position: 'absolute',
            top: '40px',
            right: 0,
            width: 300,
            maxHeight: 350,
            overflowY: 'auto',
            borderRadius: 2,
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            p: 2,
            background: '#fff',
            zIndex: 99,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Latest Notifications
          </Typography>
          <Stack spacing={1}>
            {notifications.length === 0 ? (
              <Typography sx={{ color: '#999', textAlign: 'center' }}>No notifications</Typography>
            ) : (
              notifications.map((n: any) => (
                <Box key={n._id} sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
                  <Typography fontWeight={500}>{n.notificationTitle}</Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {n.notificationDesc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    {new Date(n.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            )}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default NotificationBell;
