# AGENTS.md — Cia da Torta Emails

## Escopo do repositório

Este repositório publica, via GitHub Pages, os HTMLs de email marketing da Cia da Torta para revisão e posterior envio pelo Resend.

## Regra inegociável: opt-out do Resend

Todo HTML de email marketing deve conter exatamente um link visível de descadastro apontando para o placeholder oficial:

```html
<a href="{{{RESEND_UNSUBSCRIBE_URL}}}">descadastrar</a>
```

Regras:

- Manter as três chaves e o nome exato `RESEND_UNSUBSCRIBE_URL`.
- Nunca usar `%unsubscribe%`, `#unsubscribe-preview`, URL fixa ou link sem destino real.
- Não esconder o link; ele deve estar legível no rodapé.
- Enviar campanhas como **Resend Broadcast** para Contatos/Segmento. Não usar a API de email transacional (`emails.send`) para email marketing, porque o gerenciamento automático de descadastro pertence a Broadcasts/Automations.
- Não remover nem substituir o placeholder para publicar o preview. No GitHub Pages ele pode permanecer literal; no envio o Resend gera a URL individual.
- Páginas que são apenas hubs de preview, e não emails, devem incluir o comentário `EMAIL_PREVIEW_ONLY`.

Referência oficial: https://resend.com/docs/knowledge-base/should-i-add-an-unsubscribe-link e https://resend.com/docs/dashboard/broadcasts/introduction.

Antes de considerar qualquer email pronto, executar:

```bash
node scripts/validate-email-opt-out.mjs
```

Se a validação falhar, corrigir antes de entregar, commitar ou orientar o disparo.

## Fluxo de publicação

1. Criar a pasta da campanha e o HTML final com CSS inline/tabelas compatíveis com clientes de email.
2. Usar URLs absolutas e públicas para imagens.
3. Incluir UTMs nos CTAs e o opt-out obrigatório no rodapé.
4. Rodar a validação.
5. Atualizar o índice de previews.
6. Revisar no GitHub Pages.
7. No Resend, criar um Broadcast, selecionar o Segmento/Contatos correto, importar o HTML sem alterar o placeholder e enviar um teste antes de agendar/disparar.

Nunca commitar ou fazer push sem autorização explícita do Leonardo.
