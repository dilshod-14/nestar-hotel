import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Inquiry = () => {
  const device = useDeviceDetect();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Inquiry sent:', form);
    alert('✅ Your inquiry has been sent!');
    setForm({ name: '', email: '', message: '' });
  };

  if (device === 'mobile') {
    return <div>INQUIRY MOBILE</div>;
  } else {
    return (
      <Stack
        className="inquiry-page"
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #f8fbff, #eef3f7)',
          py: 10,
          px: 3,
          alignItems: 'center',
        }}
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight={700} textAlign="center">
            Contact Our Team
          </Typography>
          <Typography textAlign="center" sx={{ mt: 1, color: '#555' }}>
            We’ll respond to your inquiry within 24 hours ✉️
          </Typography>
        </motion.div>

        {/* FORM */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            mt: 6,
            p: 5,
            borderRadius: '20px',
            background: '#fff',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          }}
        >
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              fullWidth
            />
            <TextField
              label="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.3,
                fontSize: '16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #219ebc, #023047)',
                '&:hover': { background: 'linear-gradient(135deg,#023047,#219ebc)' },
              }}
            >
              Send Inquiry
            </Button>
          </Stack>
        </Box>
      </Stack>
    );
  }
};

export default Inquiry;
