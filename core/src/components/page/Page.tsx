import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAdditionalLink } from '../../lib/registry';
import MainView from '../App/MainView';
import Sidebar from '../Collection/Sidebar';

import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from '../../store';

const StyledPageContent = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Page = ({ collections, isSearchEnabled, searchTerm, filterTerm }: PageProps) => {
  const { id } = useParams();
  const Content = useMemo(() => {
    if (!id) {
      return '';
    }

    const page = getAdditionalLink(id);
    if (!page) {
      return '';
    }

    return page.data;
  }, [id]);

  const pageContent = useMemo(() => {
    if (!Content) {
      return <StyledPageContent>Page not found</StyledPageContent>;
    }

    return (
      <StyledPageContent>
        <Content />
      </StyledPageContent>
    );
  }, [Content]);

  return (
    <MainView>
      <Sidebar
        collections={collections}
        collection={false}
        isSearchEnabled={isSearchEnabled}
        searchTerm={searchTerm}
        filterTerm={filterTerm}
      />
      {pageContent}
    </MainView>
  );
};

function mapStateToProps(state: RootState) {
  const { collections } = state;
  const isSearchEnabled = state.config.config && state.config.config.search != false;

  return {
    collections,
    isSearchEnabled,
    searchTerm: '',
    filterTerm: '',
  };
}

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PageProps = ConnectedProps<typeof connector>;

export default connector(translate()(Page) as ComponentType<PageProps>);
