import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Stack, Typography, Button } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Notice from '../../libs/components/cs/Notice';
import Faq from '../../libs/components/cs/Faq';
import NotificationList from '../../libs/components/common/NotificationList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

// 🔹 style helper
const btnStyle = (active: boolean) => ({
  borderRadius: '20px',
  px: 4,
  py: 1.2,
  background: active ? '#ffb703' : '#fff',
  color: active ? '#fff' : '#555',
  boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
  '&:hover': { background: active ? '#fb8c00' : '#eee' },
});

const CS: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const tab = (router.query.tab as string) ?? 'notice';

  const changeTabHandler = (tab: string) => {
    router.push({ pathname: '/cs', query: { tab } }, undefined, { scroll: false });
  };

  if (device === 'mobile') return <h1>CS PAGE MOBILE</h1>;

  return (
    <Stack className="cs-page" sx={{ background: '#f7f9fc', minHeight: '100vh' }}>
      {/* HEADER */}
      <Box
        sx={{
          background: 'linear-gradient(135deg,#3ec5e0,#219ebc)',
          borderRadius: '0 0 40px 40px',
          py: 8,
          px: 3,
          textAlign: 'center',
          color: '#fff',
          boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          CS Center
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.9 }}>
          We’re here to help — Ask us anything 💌
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>

          <Button onClick={() => changeTabHandler('notice')} sx={btnStyle(tab === 'notice')}>
            Notice
          </Button>
          <Button onClick={() => changeTabHandler('faq')} sx={btnStyle(tab === 'faq')}>
            FAQ
          </Button>
         
        </Stack>
      </Box>

      <Box sx={{ mt: 6, px: 3, maxWidth: '900px', mx: 'auto', pb: 10 }}>
        {tab === 'notice' && <Notice />}
        {tab === 'faq' && <Faq />}
        {tab === 'notification' && <NotificationList />}
      </Box>
    </Stack>
  );
};

export default withLayoutBasic(CS);
