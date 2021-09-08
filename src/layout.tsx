import { Box, Container, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { NextPage } from 'next';
import Head from 'next/head';

const name = "Tai 'Mr. T' Truong";
export const siteTitle = 'Next.js Sample Website';

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>FashionDigital - Frontend Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="colum" flexWrap="wrap" style={{ gap: 50 }} justifyContent="center">
          <Typography variant="h6" gutterBottom>
            <Link color="inherit" href="/productLists">
              Products
            </Link>
          </Typography>
          <Typography variant="h6" gutterBottom>
            <Link color="inherit" href="/statistics">
              Statistics
            </Link>
          </Typography>
        </Box>
        <Typography>{children}</Typography>
      </Container>
    </div>
  );
};

export default Layout;
