import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';

interface TemplateProps {
  image: string;
  title: string;
  url: string;
}

const Template = ({ image, title, url }: TemplateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Box
        component={Link}
        href={url}
        target="_blank"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Box
          sx={{
            width: '120px',
            height: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image width={120} height={120} src={image} alt={title} />
        </Box>
        <Box component="h5" style={{ marginTop: 0, marginBottom: 0 }}>
          {title}
        </Box>
      </Box>
      <Box>
        <Link
          href={`https://app.netlify.com/start/deploy?repository=${url}&amp;stack=cms`}
          target="_blank"
        >
          <Image
            width={146}
            height={32}
            src="https://www.netlify.com/img/deploy/button.svg"
            alt="Deploy to Netlify"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Template;
