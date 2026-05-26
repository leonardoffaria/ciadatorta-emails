# Cia da Torta · Email MKT previews

Host de previews HTML dos emails da Cia da Torta para revisão interna antes de subir no RD Station / SMTP.

**URL pública:** https://leonardoffaria.github.io/ciadatorta-emails/

## Estrutura

```
/                                        índice navegável
/<slug-campanha>/                        index.html do email + SUBJECTS.md
```

## Adicionar nova campanha

1. `mkdir <slug-campanha>`
2. Copiar o email final como `<slug-campanha>/index.html`
3. Substituir placeholders RD Station por anchors inertes:
   - `%unsubscribe%` → `#unsubscribe-preview`
4. Atualizar a lista em [index.html](./index.html)
5. `git push` — GitHub Pages publica em ~30s

## Convenções de slug

`<ano-mes>-<slug-promo>` ou `<slug-promo>-<periodo>` (ex.: `tudo-699-ultima-semana-maio`).
