# Cia da Torta · Email MKT previews

Host de previews HTML dos emails da Cia da Torta para revisão interna antes do envio via Resend Broadcast.

**URL pública:** https://leonardoffaria.github.io/ciadatorta-emails/

## Estrutura

```
/                                        índice navegável
/<slug-campanha>/                        index.html do email + SUBJECTS.md
```

## Adicionar nova campanha

1. `mkdir <slug-campanha>`
2. Copiar o email final como `<slug-campanha>/index.html`
3. Manter no rodapé um único link visível `<a href="{{{RESEND_UNSUBSCRIBE_URL}}}">descadastrar</a>`
4. Atualizar a lista em [index.html](./index.html)
5. Rodar `node scripts/validate-email-opt-out.mjs`
6. Após autorização do Leonardo, fazer commit/push para publicar o preview no GitHub Pages

## Convenções de slug

`<ano-mes>-<slug-promo>` ou `<slug-promo>-<periodo>` (ex.: `tudo-699-ultima-semana-maio`).
