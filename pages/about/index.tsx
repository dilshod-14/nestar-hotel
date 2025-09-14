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
			<Stack className={'about-page'}>
				{/* Statistics */}
				<Stack className={'statistics'} sx={{ mt: 6 }}>
					<Stack
						className={'container'}
						direction="row" 
						spacing={6}
						justifyContent="center"
						alignItems="flex-start"
					>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>
								{counts.hotels}+
							</Typography>
							<Typography sx={{ textAlign: 'center', color: '#666' }}>Hotels Worldwide</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>
								{counts.guests.toLocaleString()}
							</Typography>
							<Typography sx={{ textAlign: 'center', color: '#666' }}>Happy Guests</Typography>
						</motion.div>
						<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
							<Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>
								{counts.rating.toFixed(1)}★
							</Typography>
							<Typography sx={{ textAlign: 'center', color: '#666' }}>Average Rating</Typography>
						</motion.div>
					</Stack>
				</Stack>

				{/* Services */}
				<Stack className={'services'} sx={{ mt: 10 }}>
					<Typography variant="h4" textAlign="center" fontWeight={600} mb={4}>
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
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: i * 0.3 }}
								style={{
									width: 220,
									textAlign: 'center',
									padding: '25px',
									borderRadius: '16px',
									background: '#f8f8f8',
									boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
								}}
							>
								<img src={s.icon} alt="" style={{ width: 60, marginBottom: 15 }} />
								<Typography fontWeight={600}>{s.title}</Typography>
								<Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
									{s.desc}
								</Typography>
							</motion.div>
						))}
					</Stack>
				</Stack>

				{/* ⭐ TEAM SECTION */}
				{/* ⭐ TEAM SECTION */}
				<Stack className={'team'} sx={{ mt: 12 }}>
					<Typography variant="h4" textAlign="center" fontWeight={600} mb={4}>
						Meet Our Hotel Team
					</Typography>
					<Stack direction="row" spacing={5} justifyContent="center">
						{[
							{
								img: '/img/team/member1.jpg',
								name: 'Emma Johnson',
								role: 'General Manager',
								bio: 'Over 10 years of experience leading luxury hotels worldwide.',
							},
							{
								img: '/img/team/member2.jpg',
								name: 'David Kim',
								role: 'Head Chef',
								bio: 'Award-winning chef specializing in Asian and European cuisine.',
							},
							{
								img: '/img/team/member3.jpg',
								name: 'Sophia Lee',
								role: 'Guest Relations',
								bio: 'Ensures every guest feels at home and cared for with excellence.',
							},
						].map((m, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: i * 0.2 }}
								style={{
									width: 250,
									textAlign: 'center',
									padding: '20px',
									borderRadius: '16px',
									background: '#fff',
									boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
									overflow: 'hidden',
									position: 'relative',
								}}
							>
								<div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 15px' }}>
									<img
										src={m.img}
										alt={m.name}
										style={{
											width: '120px',
											height: '120px',
											objectFit: 'cover',
											borderRadius: '50%',
										}}
									/>
									{/* Overlay on hover */}
									<div
										className="overlay"
										style={{
											position: 'absolute',
											inset: 0,
											borderRadius: '50%',
											background: 'rgba(0,0,0,0.7)',
											color: '#fff',
											opacity: 0,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											padding: '10px',
											textAlign: 'center',
											fontSize: '13px',
											transition: 'opacity 0.3s ease',
										}}
									>
										{m.bio}
									</div>
								</div>
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

				{/* Partners */}
				<Stack className={'partners'} sx={{ mt: 12 }}>
					<Typography variant="h4" textAlign="center" fontWeight={600} mb={4}>
						Trusted by Top Travel Brands
					</Typography>
					<Stack direction="row" spacing={6} justifyContent="center">
						{['booking', 'expedia', 'tripadvisor', 'airbnb'].map((logo, i) => (
							<motion.img
								key={logo}
								src={`/img/icons/brands/${logo}.svg`}
								initial={{ opacity: 0, x: -40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: i * 0.2 }}
								style={{ width: 120 }}
							/>
						))}
					</Stack>
				</Stack>

				{/* Help Section */}
				<Stack className={'help'} sx={{ mt: 12, mb: 12 }}>
					<Stack className={'container'} direction="row" justifyContent="space-between" alignItems="center">
						<Box className={'left'}>
							<Typography variant="h5" fontWeight={600}>
								Need help with your booking?
							</Typography>
							<Typography>Talk to our experts or browse more hotels.</Typography>
						</Box>
						<Box className={'right'} display="flex" gap={2}>
							<div className={'white'}>
								Contact Us <img src="/img/icons/rightup.svg" alt="" />
							</div>
							<div className={'black'}>
								<img src="/img/icons/call.svg" alt="" />
								+82 920 851 9087
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(About);
