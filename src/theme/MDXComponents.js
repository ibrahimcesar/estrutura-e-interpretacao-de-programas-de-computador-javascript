import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Figure from '@site/src/components/Figure';
import Exercise from '@site/src/components/Exercise';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map custom components
  Figure,
  Exercise,
};
