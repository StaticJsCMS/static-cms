import React from 'react';

interface OutlineProps {
  active?: boolean;
  hasError?: boolean;
  hasLabel?: boolean;
}

const Outline = (
  /* TODO { active = false, hasError = false, hasLabel = false } */ _props: OutlineProps,
) => {
  return <div />;
  // TODO return <div $active={active} $hasError={hasError} $hasLabel={hasLabel} />;
};

export default Outline;
