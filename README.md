# Cia da Torta · Email MKT

Host dos HTMLs e previews dos emails de marketing da Cia da Torta antes da publicação no Resend.

**URL pública:** https://leonardoffaria.github.io/ciadatorta-emails/

## Estrutura

```
/                                        índice navegável
/<slug-campanha>/                        index.html do email + SUBJECTS.md
```

## Regra obrigatória de opt-out

Todo HTML que será enviado deve ter um link visível de descadastro com o placeholder oficial do Resend:

```html
<a href="{{{RESEND_UNSUBSCRIBE_URL}}}">descadastrar</a>
```

- O placeholder deve permanecer exatamente assim, com três chaves. Não trocar por URL fixa, `%unsubscribe%` ou `#unsubscribe-preview`.
- Email MKT deve ser enviado como **Broadcast** para Contatos/Segmento no Resend. É o Broadcast que transforma o placeholder em uma URL única e respeita automaticamente quem já se descadastrou.
- O link pode acompanhar o estilo do rodapé, mas deve continuar visível e legível.
- As páginas que servem apenas como índice de preview devem conter o marcador `EMAIL_PREVIEW_ONLY` e nunca ser enviadas.

Referência oficial: [Resend — unsubscribe link](https://resend.com/docs/knowledge-base/should-i-add-an-unsubscribe-link) e [Resend Broadcasts](https://resend.com/docs/dashboard/broadcasts/introduction).

## Adicionar nova campanha

1. `mkdir <slug-campanha>`
2. Copiar o email final como `<slug-campanha>/index.html`
3. Incluir o link obrigatório `{{{RESEND_UNSUBSCRIBE_URL}}}` no rodapé
4. Rodar `node scripts/validate-email-opt-out.mjs`
5. Atualizar a lista em [index.html](./index.html)
6. Revisar o HTML no GitHub Pages
7. Criar o Broadcast no Resend, colar/importar o HTML sem alterar o placeholder e enviar um teste antes do disparo
8. `git push` — GitHub Pages publica em ~30s

O GitHub Actions também executa a validação em todo push e pull request. Um novo HTML de email sem opt-out, com placeholder legado ou sem texto visível de descadastro faz a checagem falhar.

## Convenções de slug

`<ano-mes>-<slug-promo>` ou `<slug-promo>-<periodo>` (ex.: `tudo-699-ultima-semana-maio`).
