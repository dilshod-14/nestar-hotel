import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stack, Typography } from '@mui/material';

const bgImages = [
  '/img/banner/header1.jpg',
  '/img/banner/header2.jpg',
];

const slogans = [
  'Choose your destination',
  'Find your place to stay',
  'Start your journey',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slogan = slogans[current];

  return (
    <Stack className="hero">
      {/* Fon rasmi */}
      <motion.div
        key={current}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImages[current % bgImages.length]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Harf-harf animatsiyali yozuv */}
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          zIndex: 1,
          marginTop: '25vh',
          flexWrap: 'wrap',
        }}
      >
        {slogan.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              fontSize: '3rem',
              fontWeight: '700',
              background: 'linear-gradient(45deg, #ff6600, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 15px rgba(255,120,0,0.4)',
              marginRight: char === ' ' ? '0.5rem' : '0',
            }}
          >
            {char}
          </motion.span>
        ))}
      </Stack>

      <Typography
        variant="h5"
        sx={{
          color: '#fff',
          textAlign: 'center',
          zIndex: 1,
          marginTop: '10px',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        and Let's go
      </Typography>
    </Stack>
  );
}
