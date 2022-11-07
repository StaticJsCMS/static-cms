import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Prism from 'prismjs';
import { isValidElement, useEffect, useMemo, useState } from 'react';
import yaml from 'yaml';

import type { ReactNode, ReactElement, SyntheticEvent } from 'react';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabData {
  title: string;
  className: string;
  content: string;
}

interface CodeTabsProps {
  children?: ReactNode;
}

const CodeTabs = ({ children }: CodeTabsProps) => {
  // const rawYaml = useMemo(() => {
  //   console.log(children);
  //   if (Array.isArray(children)) {

  //   }

  //   if (isValidElement(children)) {
  //     console.log(children);
  //     if (children.type === 'code' && children.props.className === 'codetabs') {
  //       console.log(rawYaml);
  //       return children.props.children
  //         .filter((child: ReactNode) => isValidElement(child) && child.type === 'pre')
  //         .map((child: ReactElement) => child.props.children.props.children);
  //     }
  //   }

  //   return undefined;
  // }, [children]);

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [tabs, setTabs] = useState<TabData[]>([]);

  useEffect(() => {
    if (!children || !Array.isArray(children)) {
      return;
    }



    const javascriptLines = JSON.stringify(yaml.parseAllDocuments(rawYaml), null, 2).split('\n');
    const rawJavascript = javascriptLines
      .slice(2, javascriptLines.length - 2)
      .map(line =>
        line
          .replace(/^[ ]{4}/g, '')
          .replace(/"([a-zA-Z][a-zA-Z_0-9]*)":/g, '$1:')
          .replace(/"/g, "'"),
      )
      .join('\n');

    const javascript = Prism.highlight(rawJavascript, Prism.languages.javascript, 'javascript');
    const highlightedYaml = Prism.highlight(rawYaml, Prism.languages.yaml, 'yaml');

    setOutput();
  }, [children, rawYaml, value]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ '.MuiTabs-root': { margin: 0 }, '.MuiTabs-flexContainer': { margin: 0 } }}
        >
          {tabs.map((tabData, index) => (
            <Tab key={tabData.className} label={tabData.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tabData, index) => (
        <TabPanel key={tabData.className} value={value} index={index}>
          <pre className={tabData.className}>
            <code
              className={tabData.className}
              dangerouslySetInnerHTML={{ __html: tabData.content }}
            />
          </pre>
        </TabPanel>
      ))}
    </Box>
  );
};

export default CodeTabs;
