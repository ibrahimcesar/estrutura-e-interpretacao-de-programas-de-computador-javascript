import React from 'react';
import Content from '@theme-original/Navbar/Content';
import ReadModeToggle from '@site/src/components/ReadModeToggle';

/**
 * Navbar Content wrapper
 * Adiciona o botão de modo leitura antes dos itens da direita
 */
export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <ReadModeToggle />
    </>
  );
}
