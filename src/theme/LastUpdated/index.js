import React from 'react';
import LastUpdated from '@theme-original/LastUpdated';

/**
 * O "por <autor>" vem do autor git do último commit que tocou o arquivo
 * (%an). Commits antigos de tradução foram criados com o autor "Claude";
 * este wrapper normaliza a exibição para o mantenedor do projeto.
 */
const AUTHOR_ALIASES = {
  Claude: 'Ibrahim Cesar',
  'github-actions[bot]': 'Ibrahim Cesar',
};

export default function LastUpdatedWrapper(props) {
  const author = props.lastUpdatedBy;
  const mapped = author && AUTHOR_ALIASES[author] ? AUTHOR_ALIASES[author] : author;
  return <LastUpdated {...props} lastUpdatedBy={mapped} />;
}
