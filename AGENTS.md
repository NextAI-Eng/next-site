# Next AI site

Single page institucional da Next AI. Astro 7 estático, CSS puro, publicado no Netlify.

## Comandos

```
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/
npm run preview
```

## Estrutura

- Páginas: `index.astro` (home, com resumos), `projetos.astro`, `case.astro`, `solucoes.astro`, mais `obrigado.astro` e `404.astro`.
- `Projetos`, `CaseSaneamento` e `Solucoes` têm `mode="teaser"` (resumo com link, usado na home) e `mode="full"` (conteúdo completo, usado nas páginas próprias).
- Links diretos para um item abrem o acordeão certo: `/projetos#pesquisas`, `/solucoes#qualidade` (o `id` do `<details>` vem de `data/projetos.ts` e `data/solucoes.ts`).
- `PageHero` e `CtaBand` montam o topo e o fim das páginas internas. O formulário de contato existe só na home (`/#contato`).
- `src/components/sections/*` uma seção por arquivo, com âncora (`#quem-somos`, `#projetos`, `#case`, `#solucoes`, `#contato`).
- `src/data/*.ts` guarda o texto. Para mudar conteúdo, edite aqui antes de mexer no markup.
- `src/svg/*.svg.html` são gráficos e esquemas importados com `?raw`.
- `src/styles/tokens.css` (cores, fontes, `--u`), `deck.css` (componentes herdados do deck), `base.css` (layout do site e responsivo).
- `src/scripts/site.ts` faz tema, menu, reveal por scroll, contadores, o canvas de fluxo e a transição entre páginas.
- Transição: `<ClientRouter />` em `Base.astro` troca a página sem recarregar e a varredura das três setas (`#wipe`) toca no meio. O script de página roda em `init()` a cada navegação, então listeners novos de página devem entrar lá. O canvas usa `transition:persist`. O formulário usa `data-astro-reload` para o Netlify Forms receber o POST normal.

## Convenções

- Cada bloco `.sl` é revelado ao entrar na tela (classe `.on`). Animações novas devem partir de `.sl.on`.
- Sem JS o conteúdo continua visível (`html:not(.js)` em `base.css`).
- Tema escuro por padrão; o claro usa `data-deck="light"` em `<html>`.
- Não usar travessão nem meia-risca (use hífen). Comentários explicam só o porquê.

## Deploy

- `netlify.toml` define build e publish (`dist`). Cada push na branch `main` publica.
- O formulário usa Netlify Forms (`name="contato"`, honeypot `bot-field`). Ativar a notificação por e-mail em Site settings > Forms.
- `site` em `astro.config.mjs`, `public/robots.txt` e o canonical dependem do domínio final: atualizar quando for configurado.
