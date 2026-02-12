## Contexto
- O projeto já está no padrão shadcn + Tailwind + TypeScript.
- Componentes UI ficam em [src/components/ui](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/src/components/ui) e o alias `@/` aponta para `src` (ex.: [Index.tsx](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/src/pages/Index.tsx#L1-L20)).
- Por isso, o local correto para `infinite-slider.tsx` neste repo é `src/components/ui/infinite-slider.tsx` (equivalente ao import `@/components/ui/...`). Criar um `/components/ui` na raiz quebraria a consistência de imports/geradores do shadcn.

## Dependências
- Confirmar/usar `framer-motion` (já existe no [package.json](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/package.json#L15-L68)).
- Instalar `react-use-measure` (não está listado no [package.json](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/package.json#L15-L68)).

## Implementação
1. Adicionar o componente exatamente como fornecido em `src/components/ui/infinite-slider.tsx`.
2. Inserir uma nova seção “Patrocinadores” entre [CoursesSection](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/src/components/CoursesSection.tsx#L28-L66) e [CTASection](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/src/components/CTASection.tsx#L11-L68) alterando [Index.tsx](file:///c:/Users/Usu%C3%A1rio/Desktop/mesdamulhercurionopolis/mesdamulher2/src/pages/Index.tsx#L8-L19).
3. Montar o carrossel usando `InfiniteSlider` com os logos do `public/`:
   - `/GG_logo-BLUE.png`
   - `/AL-INVEST-Verde-400x119.png`
   - `/Logo%20Sebrae%202.png` (URL-encoded por causa dos espaços)
   - `/logoUEportuvertical.jpg.jpeg`
4. Ajustar o layout responsivo:
   - Altura consistente para logos (`h-14 sm:h-16 md:h-20`), `object-contain`, e wrappers com largura mínima para manter espaçamento.
   - `durationOnHover` para desacelerar ao passar o mouse.

## Verificação
- Rodar o dev server e abrir o preview.
- Checar no navegador se:
  - o carrossel aparece exatamente entre “Cursos do Mês da Mulher” e “Como se Inscrever”;
  - as imagens carregam (inclusive a que tem espaços no nome);
  - o scroll infinito está suave no desktop e no mobile.

## Resultado esperado
- Uma faixa de patrocinadores com animação contínua (infinite slider) entre as duas seções, usando as 4 imagens do `public/`.