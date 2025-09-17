import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const About: NextPage = () => {
	const device = useDeviceDetect();
	const [counts, setCounts] = useState({ hotels: 0, guests: 0, rating: 0 });

	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			i++;
			setCounts({
				hotels: Math.min(i * 2, 120),
				guests: Math.min(i * 1000, 50000),
				rating: Math.min(i * 0.2, 4.9),
			});
			if (i > 50) clearInterval(interval);
		}, 50);
	}, []);

	if (device === 'mobile') {
		return <div>ABOUT PAGE MOBILE</div>;
	} else {
		return (
			<Stack className="about-page" sx={{ background: 'linear-gradient(180deg,#fefefe,#f5f7fa)', pb: 10 }}>
				{/* ⭐ STATISTICS */}
				<Stack sx={{ mt: 10, py: 6, background: 'linear-gradient(135deg,#ffb70320,#219ebc20)', borderRadius: '24px' }}>
					<Typography textAlign="center" variant="h4" fontWeight={700} mb={5} color="#023047">
						Our Achievements
					</Typography>
					<Stack direction="row" spacing={6} justifyContent="center">
						{[
							{ label: 'Hotels Worldwide', value: counts.hotels + '+', color: '#ffb703' },
							{ label: 'Happy Guests', value: counts.guests.toLocaleString(), color: '#fb8500' },
							{ label: 'Average Rating', value: counts.rating.toFixed(1) + '★', color: '#219ebc' },
						].map((s, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: i * 0.2 }}
								style={{
									background: '#fff',
									padding: '30px',
									borderRadius: '20px',
									boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
									textAlign: 'center',
									width: 220,
								}}
							>
								<Typography variant="h3" fontWeight={700} color={s.color}>
									{s.value}
								</Typography>
								<Typography sx={{ color: '#555' }}>{s.label}</Typography>
							</motion.div>
						))}
					</Stack>
				</Stack>

				{/* ⭐ SERVICES */}
				<Stack sx={{ mt: 12 }}>
					<Typography variant="h4" textAlign="center" fontWeight={700} mb={5} color="#023047">
						Why Guests Love Staying With Us
					</Typography>
					<Stack direction="row" justifyContent="center" spacing={4}>
						{[
							{
								icon: '/img/icons/spa.svg',
								title: 'Wellness & Spa',
								desc: 'Relax and recharge in our wellness centers.',
							},
							{ icon: '/img/icons/roomservice.svg', title: 'Room Service', desc: '24/7 concierge at your fingertips.' },
							{
								icon: '/img/icons/breakfast.svg',
								title: 'Free Breakfast',
								desc: 'Start your day with delicious meals.',
							},
						].map((s, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: i * 0.2 }}
								style={{
									width: 220,
									padding: '25px',
									textAlign: 'center',
									borderRadius: '20px',
									background: 'linear-gradient(135deg,#fff,#fef6e4)',
									boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
									cursor: 'pointer',
								}}
							>
								<img src={s.icon} alt="" style={{ width: 60, marginBottom: 15 }} />
								<Typography fontWeight={600} color="#fb8500">
									{s.title}
								</Typography>
								<Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
									{s.desc}
								</Typography>
							</motion.div>
						))}
					</Stack>
				</Stack>

				{/* ⭐ TEAM */}
				<Stack sx={{ mt: 12 }}>
					<Typography variant="h4" textAlign="center" fontWeight={700} mb={5} color="#023047">
						Meet Our Hotel Team
					</Typography>
					<Stack direction="row" spacing={5} justifyContent="center">
						{[
							{
								img: '/img/team/member1.avif',
								name: 'Emma Johnson',
								role: 'General Manager',
								bio: 'Over 10 years of experience leading luxury hotels worldwide.',
							},
							{
								img: '/img/team/member2.avif',
								name: 'David Kim',
								role: 'Head Chef',
								bio: 'Award-winning chef specializing in Asian and European cuisine.',
							},
							{
								img: '/img/team/member3.avif',
								name: 'Sophia Lee',
								role: 'Guest Relations',
								bio: 'Ensures every guest feels at home and cared for with excellence.',
							},
						].map((m, i) => (
							<motion.div
								key={i}
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 200 }}
								style={{
									width: 250,
									background: '#fff',
									borderRadius: '20px',
									padding: '25px',
									textAlign: 'center',
									boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
								}}
							>
								<img
									src={m.img}
									alt={m.name}
									style={{
										width: 120,
										height: 120,
										borderRadius: '50%',
										objectFit: 'cover',
										marginBottom: 15,
										border: '4px solid #219ebc20',
									}}
								/>
								<Typography fontWeight={600}>{m.name}</Typography>
								<Typography variant="body2" sx={{ color: '#777' }}>
									{m.role}
								</Typography>
								<Box display="flex" justifyContent="center" gap={1} mt={1}>
									<IconButton size="small">
										<FaInstagram />
									</IconButton>
									<IconButton size="small">
										<FaLinkedin />
									</IconButton>
									<IconButton size="small">
										<FaTwitter />
									</IconButton>
								</Box>
							</motion.div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(About);
