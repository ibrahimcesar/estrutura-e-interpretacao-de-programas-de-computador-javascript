import React from 'react';

export default function HelpFooter() {
  return (
    <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--ifm-color-emphasis-100)', borderRadius: '8px' }}>
      <h2>📝 Encontrou algo errado nesta página?</h2>
      <p>Sua ajuda é muito importante para melhorar a qualidade da tradução!</p>

      <h3>🐛 Encontrou um erro?</h3>
      <p>Se você encontrou:</p>
      <ul>
        <li>Erro de tradução (palavra incorreta, termo técnico errado)</li>
        <li>Erro de ortografia ou gramática</li>
        <li>Link quebrado</li>
        <li>Código de exemplo que não funciona</li>
        <li>Problema de formatação</li>
      </ul>
      <p>
        <strong>
          <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues/new?template=02-bug-report.yml" target="_blank" rel="noopener noreferrer">
            Reporte um bug →
          </a>
        </strong>
      </p>

      <h3>❓ Tem uma dúvida?</h3>
      <p>Se você tem:</p>
      <ul>
        <li>Dúvida sobre o conteúdo desta seção</li>
        <li>Pergunta sobre um conceito do SICP</li>
        <li>Dificuldade em entender algum exemplo</li>
        <li>Questão sobre a tradução de algum termo</li>
      </ul>
      <p>
        <strong>
          <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions/categories/perguntas-e-ajuda" target="_blank" rel="noopener noreferrer">
            Inicie uma discussão →
          </a>
        </strong>
      </p>

      <h3>💡 Tem uma sugestão de melhoria?</h3>
      <p>Se você quer sugerir:</p>
      <ul>
        <li>Melhoria na explicação</li>
        <li>Exemplo adicional</li>
        <li>Recurso visual (diagrama, ilustração)</li>
        <li>Qualquer outra ideia</li>
      </ul>
      <p>
        <strong>
          <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions/categories/geral" target="_blank" rel="noopener noreferrer">
            Sugira uma melhoria →
          </a>
        </strong>
      </p>

      <h3>🌍 Quer discutir a tradução?</h3>
      <p>Se você quer debater:</p>
      <ul>
        <li>Escolha de tradução de algum termo</li>
        <li>Consistência de terminologia</li>
        <li>Nuances do português</li>
      </ul>
      <p>
        <strong>
          <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions/categories/discuss%C3%B5es-de-tradu%C3%A7%C3%A3o" target="_blank" rel="noopener noreferrer">
            Discussão de tradução →
          </a>
        </strong>
      </p>

      <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
        Obrigado por ajudar a melhorar o SICP.js PT-BR! ✨
      </p>
    </div>
  );
}
