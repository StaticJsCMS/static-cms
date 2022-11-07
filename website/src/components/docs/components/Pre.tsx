import { isValidElement, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Prism from 'prismjs';
import yaml from 'yaml';
import prettier from 'prettier';

import type { ReactNode, SyntheticEvent } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface PreProps {
  children?: ReactNode;
}

const Pre = ({ children }: PreProps) => {
  const yaml = useMemo(() => {
    if (isValidElement(children)) {
      if (children.type === 'code' && children.props.className === 'language-yaml') {
        return children.props.children as string;
      }
    }

    return undefined;
  }, [children]);

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(yaml, children);

  const [output, setOutput] = useState(<pre>{children}</pre>);

  useEffect(() => {
    if (!yaml) {
      return;
    }

    const highlightedYaml = Prism.highlight(yaml, Prism.languages.yaml, 'yaml');

    setOutput(
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ '.MuiTabs-root': { margin: 0 }, '.MuiTabs-flexContainer': { margin: 0 } }}
          >
            <Tab label="Yaml" {...a11yProps(0)} />
            <Tab label="JavaScript" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <pre className="language-yaml">
            <code className="language-yaml" dangerouslySetInnerHTML={{ __html: highlightedYaml }} />
          </pre>
        </TabPanel>
        <TabPanel value={value} index={1}>
          JavaScript
        </TabPanel>
      </Box>,
    );
  }, [children, yaml, value]);

  return output;
};

export default Pre;
