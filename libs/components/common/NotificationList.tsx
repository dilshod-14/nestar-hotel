// libs/components/common/NotificationList.tsx
import { useMemo, useState, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';

// MUI (default importlar — eski TS bilan barqarorroq)
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import NotificationsIcon from '@mui/icons-material/Notifications';

// GraphQL
const GET_MY_NOTIFICATIONS = gql`
	query GetMyNotifications {
		getMyNotifications {
			_id
			notificationTitle
			notificationDesc
			notificationStatus
			createdAt
		}
	}
`;

const POLL_MS = 10_000;

const NotificationList = () => {
	const [open, setOpen] = useState(false);

	// eski TS bilan muammosiz bo‘lishi uchun any ishlatamiz
	const { data, loading, error } = useQuery<any>(GET_MY_NOTIFICATIONS, {
		pollInterval: POLL_MS,
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
		ssr: false,
	});

	const src = (data && data.getMyNotifications) || [];
	const items = useMemo(() => src.slice(0, 5), [src]);
	const unreadCount = useMemo(() => src.filter((n: any) => n.notificationStatus === 'WAIT').length, [src]);

	const handleToggle = useCallback(() => setOpen((v) => !v), []);
	const handleClose = useCallback(() => setOpen(false), []);
	const onKeyDown = useCallback((e: any) => {
		if (e && e.key === 'Escape') setOpen(false);
	}, []);

	return (
		// MUAMMO bergan joy: Box o‘rniga oddiy div + style
		<div style={{ position: 'relative' }} onKeyDown={onKeyDown}>
			<Badge badgeContent={unreadCount} color="error" overlap="circular" max={99}>
				<IconButton
					aria-label="notifications"
					aria-haspopup="true"
					aria-expanded={open ? 'true' : 'false'}
					onClick={handleToggle}
					size="large"
				>
					<NotificationsIcon sx={{ color: '#444' }} />
				</IconButton>
			</Badge>

			{open && (
				<ClickAwayListener onClickAway={handleClose}>
					<Paper
						elevation={6}
						sx={{
							position: 'absolute',
							top: 44,
							right: 0,
							width: 320,
							maxHeight: 360,
							overflowY: 'auto',
							borderRadius: 2,
							p: 2,
							zIndex: 1300,
						}}
						role="menu"
					>
						<Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
							Notifications
						</Typography>

						{loading && (
							<Typography variant="body2" sx={{ color: 'text.secondary' }}>
								Loading…
							</Typography>
						)}

						{error && (
							<Typography variant="body2" color="error">
								Failed to load notifications
							</Typography>
						)}

						{!loading && !error && (
							<Stack spacing={1}>
								{items.length === 0 ? (
									<Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>No notifications</Typography>
								) : (
									items.map((n: any) => (
										<Box key={n._id} component="div" sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
											<Typography fontWeight={600}>{n.notificationTitle}</Typography>
											<Typography variant="body2" sx={{ color: 'text.secondary' }}>
												{n.notificationDesc}
											</Typography>
											<Typography variant="caption" sx={{ color: 'text.disabled' }}>
												{new Date(n.createdAt).toLocaleString()}
											</Typography>
										</Box>
									))
								)}
							</Stack>
						)}
					</Paper>
				</ClickAwayListener>
			)}
		</div>
	);
};

export default NotificationList;
