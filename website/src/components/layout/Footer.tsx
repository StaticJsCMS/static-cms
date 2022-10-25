import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import config from '../../lib/config';
import Container from './Container';

const StyledFooter = styled('footer')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.palette.mode === 'light' ? '#dddee2' : '#242424'};
    padding: 24px 0 40px;
  `,
);

const StyledFooterContent = styled('footer')`
  width: 100%;
  display: flex;
  gap: 40px;
  align-items: center;
`;

const StyledButtons = styled('div')`
  display: flex;
  gap: 8px;
`;

const StyledLinks = styled('div')`
  display: flex;
  gap: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledFooterContent>
          <StyledButtons>
            {config.footer.buttons.map(button => (
              <Button key={button.url} href={button.url} target="_blank" variant="contained">
                {button.text}
              </Button>
            ))}
          </StyledButtons>
          <StyledLinks>
            {config.footer.links.map(link => (
              <StyledLink key={link.url} href={link.url} target="_blank" color="text.primary">
                {link.text}
              </StyledLink>
            ))}
          </StyledLinks>
        </StyledFooterContent>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
