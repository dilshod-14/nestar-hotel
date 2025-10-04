import { Box, Stack, Typography, TextField, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaTwitter } from 'react-icons/fa';

const Footer = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');

	const handleSubscribe = () => {
		if (!email) return alert('Please enter your email');
		//  Emailni query sifatida yuboramiz
		router.push({
			pathname: '/property', // filtr sahifang route nomi
			query: { search: email }, // kerakli query key
		});
	};
	return (
		// @ts-ignore
		<Box id="hotel-footer">
			{/* 📩 Newsletter */}
			<Stack className="newsletter">
				<Box className="left">
					<Typography className="brand">StayGo</Typography>
					<Typography sx={{ color: '#ccc', mt: 1 }}>Get exclusive hotel deals, discounts and travel tips</Typography>
					<Box className="subscribe">
						<TextField
							placeholder="Your Email"
							variant="outlined"
							size="small"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{
								flex: 1,
								bgcolor: '#1e2535',
								borderRadius: '30px 0 0 30px',
								input: { color: '#fff' },
								'& fieldset': { border: 'none' },
							}}
						/>
						<Button
							onClick={handleSubscribe}
							sx={{
								bgcolor: '#ffb703',
								color: '#0b1220',
								borderRadius: '0 30px 30px 0',
								px: 4,
								fontWeight: 600,
								'&:hover': { bgcolor: '#f2a900' },
							}}
						>
							Subscribe
						</Button>
					</Box>
				</Box>
				<Box className="right">
					<img src="/img/icons/newsletter.png" alt="newsletter" />
				</Box>
			</Stack>

			{/* ⭐ Features */}
			<Stack className="features">
				{[
					{ icon: '/img/icons/price.svg', title: 'Best Prices', text: 'Exclusive hotel offers' },
					{ icon: '/img/icons/support.svg', title: '24/7 Support', text: 'Anytime, anywhere' },
					{ icon: '/img/icons/booking.svg', title: 'Easy Booking', text: 'Fast & simple process' },
					{ icon: '/img/icons/verified.svg', title: 'Verified Hotels', text: 'Trusted reviews' },
					{ icon: '/img/icons/payment.svg', title: 'Secure Payments', text: 'Safe checkout' },
				].map((f, i) => (
					<Box key={i} className="feature">
						<img src={f.icon} alt={f.title} />
						<strong>{f.title}</strong>
						<span>{f.text}</span>
					</Box>
				))}
			</Stack>

			{/* 📍 Bottom Columns */}
			<Stack className="bottom">
				<Box className="col">
					<img src="/img/logo/logoWhite.svg" alt="StayGo" className="logo" />
					<Typography sx={{ color: '#aaa', mt: 1, mb: 2 }}>
						Discover luxury stays and world-class hospitality worldwide.
					</Typography>
					<span>📍 Seoul, South Korea</span>
					<span>📞 +82 10 4867 2909</span>
					<span>📩 support@staygo.com</span>
					<Box className="icons">
						<IconButton>
							<FaFacebookF />
						</IconButton>
						<IconButton>
							<FaInstagram />
						</IconButton>
						<IconButton>
							<FaTelegramPlane />
						</IconButton>
						<IconButton>
							<FaTwitter />
						</IconButton>
					</Box>
				</Box>

				<Box className="col">
					<strong>Company</strong>
					<span>About Us</span>
					<span>Terms of Use</span>
					<span>Privacy Policy</span>
					<span>Contact Support</span>
					<span>Careers</span>
				</Box>

				<Box className="col">
					<strong>Explore</strong>
					<span>Luxury Resorts</span>
					<span>City Hotels</span>
					<span>Beach Villas</span>
					<span>Adventure Trips</span>
					<span>Romantic Escapes</span>
				</Box>

				<Box className="col">
					<strong>Download App</strong>
					<img src="/img/icons/appstore.svg" alt="App Store" style={{ width: 120 }} />
					<img src="/img/icons/playstore.svg" alt="Google Play" style={{ width: 120 }} />
					<strong>Payments</strong>
					<img src="/img/icons/payments.webp" alt="Payments" style={{ width: 160, marginTop: 10 }} />
				</Box>
			</Stack>

			{/* ⚖️ Copyright */}
			<Box className="copyright">
				<span>© StayGo {new Date().getFullYear()} — All Rights Reserved</span>
				<Box className="links">
					<span>Privacy</span> · <span>Terms</span> · <span>Sitemap</span>
				</Box>
			</Box>
		</Box>
	);
};

export default Footer;
