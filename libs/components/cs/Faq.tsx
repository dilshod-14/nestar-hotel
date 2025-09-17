import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  const faqs = [
    {
      q: 'How do I register?',
      a: 'Click the Sign Up button on the top-right and fill out the form.',
    },
    {
      q: 'How can I contact support?',
      a: 'You can contact support via the Contact Us page or call our hotline.',
    },
    {
      q: 'Is it free to list my property?',
      a: 'Yes, listing properties is completely free!',
    },
  ];

  return (
    <Stack spacing={2}>
      {faqs.map((faq, i) => (
        <Accordion
          key={i}
          sx={{
            borderRadius: 2,
            boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: '#555' }}>{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default Faq;
