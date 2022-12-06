import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Prism from 'prismjs';
import { isValidElement, useMemo, useState } from 'react';

import { isNotEmpty } from '../../../util/string.util';

import type { Grammar } from 'prismjs';
import type { ReactElement, ReactNode, SyntheticEvent } from 'react';

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

interface CodeLanguage {
  title: string;
  grammar: Grammar;
  language: string;
}

const supportedLanguages: Record<string, CodeLanguage> = {
  'language-yaml': {
    title: 'Yaml',
    grammar: Prism.languages.yaml,
    language: 'yaml',
  },
  'language-js': {
    title: 'JavaScript',
    grammar: Prism.languages.javascript,
    language: 'javascript',
  },
};

interface TabData {
  title: string;
  className: string;
  content: string;
}

interface CodeTabsProps {
  children?: ReactNode;
}

const CodeTabs = ({ children }: CodeTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = useMemo(() => {
    if (!children || !Array.isArray(children)) {
      return [];
    }

    return children
      .filter((child: ReactNode) => isValidElement(child) && child.type === 'pre')
      .map((child: ReactElement) => child.props.children)
      .filter((subChild: ReactNode) => isValidElement(subChild) && subChild.type === 'code')
      .map((code: ReactElement) => {
        if (!(code.props.className in supportedLanguages)) {
          return false;
        }

        const language = supportedLanguages[code.props.className];

        return {
          title: language.title,
          className: code.props.className,
          content:
            typeof code.props.children === 'string' && isNotEmpty(code.props.children)
              ? Prism.highlight(code.props.children, language.grammar, language.language)
              : '',
        };
      })
      .filter(Boolean) as TabData[];
  }, [children]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', margin: '8px 0 16px' }}>
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
