import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import Comments from '@site/src/components/Comments';

/**
 * Anexa a seção de comentários (giscus) ao rodapé de toda página de
 * conteúdo, depois dos metadados de edição/última atualização.
 */
export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <Comments />
    </>
  );
}
