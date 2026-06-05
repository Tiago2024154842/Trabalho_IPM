# Missão Casa de Banho

Projeto académico de Interação Pessoa Máquina (IPM) — ISEC, Licenciatura em Engenharia Informática, ramo Desenvolvimento de Aplicações. Trabalho Prático nº4, ano letivo 2025/26. Entrega: 8 de maio. Apresentação: a partir de 13 de maio.

## Equipa

- Miguel Martins — a2024138611@isec.pt
- Tiago Maninha — a2024154842@isec.pt

## O que é

Aplicação interativa de apoio a histórias sociais multimédia para ensinar crianças com necessidades especiais a usar a casa de banho de forma autónoma. Inspira-se no projeto Doctor Tea (Dibujos Animados). Tema do enunciado: **S5 — "Eu sei usar a casa de banho"**.

A aplicação é pensada para ser instalada num **ecrã (monitor ou tablet) montado na parte interior da porta da casa de banho individual**, controlada por **botões físicos** ligados a um Raspberry Pi. **Não é touch.**

## Problema que resolve

Crianças com necessidades especiais (sobretudo PEA, atrasos de desenvolvimento, dificuldades de regulação sensorial) apresentam dificuldades em usar a casa de banho autonomamente:
- Dificuldade em reconhecer sinais do corpo
- Não saber a sequência correta de ações
- Sensibilidade a estímulos (sons, cheiros, espaço)
- Resultado: ansiedade, insegurança, dependência constante de um adulto.

## Utilizadores-alvo

Crianças do pré-escolar e 1.º ciclo (3-10 anos), incluindo crianças mais velhas cuja **idade de desenvolvimento** corresponda a esta faixa, com:
- Perturbação do Espectro do Autismo (PEA)
- Dificuldades de autonomia
- Dificuldades de regulação sensorial

Utilizador secundário: **cuidador / educador / terapeuta** que configura, personaliza e acompanha o progresso.

## Proto-personas

### Tomás, 5 anos
PEA nível 2, hipersensibilidade sensorial. Verbal com vocabulário limitado, não lê. Evita autoclismo por causa do som. Beneficia de previsibilidade e instruções visuais curtas. Interesse especial por comboios. Usa tablet diariamente.

### Leonor, 7 anos
Atraso global de desenvolvimento. Esquece a sequência de ações. Lê algumas palavras. Quer fazer sozinha sem chamar a mãe. Motivada por sistemas de pontos e níveis.

### Sara, 34 anos (cuidadora)
Mãe do Tomás. Configura perfil sensorial, acompanha progresso via dashboard, partilha relatórios com a educadora. Quer reduzir intervenção direta na rotina.

## Solução

Sistema híbrido com 3 camadas:

1. **História social multimédia interativa** com herói/heroína que executa cada etapa (video modelling).
2. **Guiagem passo-a-passo** com confirmação manual (botões) ou automática (sensores).
3. **Gamificação** com sistema de estrelas, missões e progresso.

Mais um quarto pilar **inovador** que distingue o projeto:

4. **Gestão de imprevistos** — a app reconhece e ajuda a lidar com situações reais (sem papel, papel caído, sem sabão, autoclismo não funciona, acidente). Esta é uma das contribuições originais do projeto.

## Stack tecnológica

### Frontend
- **Next.js 15+** (App Router, JavaScript)
- **Tailwind CSS** para estilos
- **React 19** (incluído no Next.js)
- Sem TypeScript (decisão consciente para reduzir complexidade num TP académico)
- Sem `src/` directory

### Hardware
- **Raspberry Pi** (modelo a confirmar) com Raspberry Pi OS
- **5 botões físicos** ligados ao GPIO via breadboard e jumpers
- **Monitor** ligado por HDMI/micro-HDMI (não touch)
- **Sensores** (a definir, do kit do ISEC):
  - Sensor ultrassónico HC-SR04 (deteção de presença) — em pedido
  - Possíveis adicionais: LED RGB para feedback ambiente, buzzer passivo

### Comunicação Pi ↔ App
Script Python no Pi lê os GPIO e **simula eventos de teclado** que a app web no browser captura. Isto evita ter de fazer comunicação real (HTTP/WebSocket) entre processos durante o desenvolvimento.

Mapeamento atual:
- `←` → botão azul ANTERIOR
- `→` → botão azul SEGUINTE
- `Enter` → botão verde ESCOLHER / FEITO
- `h` → botão amarelo AJUDA
- `m` → botão vermelho MENU (5º botão — volta ao menu principal de missões)

## Modelo de interação

A criança **não toca no ecrã**. Tudo é controlado pelos 5 botões físicos por baixo do monitor.

Em qualquer ecrã há sempre **uma opção em foco** (com moldura coral, etiqueta "EM FOCO" e ligeiramente maior). A criança:
- Move o foco com **ANTERIOR / SEGUINTE** (azuis)
- Confirma com **ESCOLHER / FEITO** (verde, maior)
- Pede ajuda com **AJUDA** (amarelo)
- Volta ao menu principal com **MENU** (vermelho, tecla `m`) — disponível em todos os ecrãs exceto boas-vindas e menu de missões

Os botões físicos têm cores que **correspondem aos elementos no ecrã**: o ✓ verde no ecrã está alinhado verticalmente com o botão verde físico. Esta consistência é intencional e deve ser mantida.

## Estrutura de ecrãs

```
1. Boas-vindas         (Olá, Tomás! + herói + COMEÇAR)
   ↓
2. Menu de missões     (Xixi / Cocó / Lavar Mãos / Conquistas — grelha 2x2)
   ↓
3. Passo da missão     (template, repete-se 6 vezes por missão)
   ↓
4. Recompensa          (Parabéns + estrelas)
   ↓
5. (volta ao menu)

Adicionais:
- Álbum de conquistas    (/conquistas, grelha 5x2 de autocolantes)
- Mini-jogo de ordenação (drag-and-drop por botões)
- Ecrã de Ajuda          (/ajuda, acessível via botão AJUDA — 4 opções 2x2)
  → /ajuda/demo          (demonstração guiada Tipo A → ecrã "Conseguiste?" via EcraPerguntaBinaria)
  → /ajuda/enviado       (confirmação após escolha)
- Dashboard do cuidador  (PIN-gated, configuração e progresso)
```

## Decisões de design importantes

### Paleta
- Fundo principal: gradiente azul claro `#E8F4FA` → `#B8DCEB`
- Verde primário (botão de ação): `#7FB342` com borda `#3B6D11`
- Azul secundário (navegação): `#85B7EB` com borda `#185FA5`
- Amarelo (ajuda): `#FAC775` com borda `#854F0B`
- Coral (foco/destaque): `#F7A072`
- Texto principal: `#1A4F7A`
- Texto secundário: `#5A7A95`

**Cores evitadas propositadamente:** vermelhos saturados (associados a erro/perigo, geram ansiedade), amarelos vivos (desconforto visual), verdes muito saturados, contrastes complementares fortes (problemáticos para crianças com hipersensibilidade visual).

### Tipografia
- Fonte principal: **Nunito** ou **Atkinson Hyperlegible** (esta última desenhada para acessibilidade visual)
- Tamanhos mínimos: 22pt corpo, 32pt títulos secundários, 38-56pt títulos principais
- Atenção: a fonte tem de suportar caracteres portugueses (acentos `á é í ó ú ç`). Algumas fontes mostram glifos errados para `ś`/`á`.

### Mascote
**Super-herói (rapazes) e super-heroína (raparigas)** com fato e capa, ambos com "M" no peito (de **Missão**, não de Miguel). Estilo cartoon, paleta azul-claro/branco para o herói, rosa-claro/branco para a heroína. As ilustrações já existem para várias poses (acenar, sentar, lavar mãos, puxar papel, parabéns).

### Heurísticas de Nielsen aplicadas
- **#1 Visibilidade do estado** — barra de progresso de 6 pontos no topo do ecrã de passo
- **#2 Correspondência mundo real** — vocabulário de "missão", pictogramas concretos
- **#3 Controlo do utilizador** — botão AJUDA sempre presente, possibilidade de voltar atrás
- **#4 Consistência** — mesmo layout em todos os ecrãs; cores dos botões físicos = cores no ecrã
- **#5 Prevenção de erros** — não há estados de "falha", apenas "tenta outra vez"
- **#7 Flexibilidade** — perfil sensorial configurável (som, vibração, velocidade da narração)
- **#8 Estética minimalista** — 3 elementos no máximo por ecrã

### Princípios de Design Universal aplicados
- **Uso equitativo** — ecrã na porta serve toda a gente, não estigmatiza
- **Flexibilidade** — perfil sensorial por criança, missões desbloqueáveis
- **Uso simples e intuitivo** — uma só ação por ecrã
- **Informação perceptível** — redundância visual + sonora + textual
- **Tolerância a erros** — sem estados destrutivos
- **Baixo esforço físico** — botões grandes, espaçados, sem precisão fina

## Estado da arte (5 papers para o relatório)

1. **Klavina et al. (2024)** — *Digital Health* — sistematização de tecnologias assistivas para PEA + ID em daily living skills.
2. **Alexander, Ayres & Smith (2015)** — *J. Occupational Therapy* — video modelling em tablet, melhoria de 50,5% em self-care.
3. **Hsu, Lin & Chen (2018)** — *Disability and Rehabilitation: Assistive Technology* — Kinect para auto-higiene em crianças com PEA.
4. **Deng & Rattadilok (2022)** — *Sensors (MDPI)* — sensores corporais geram stress em crianças com PEA → justifica preferência por sensores ambientais.
5. **Marín-Morales et al. (2023)** — *Review J. Autism Dev. Disorders* — gamificação aumenta motivação e autonomia em PEA.

Lacuna identificada que o projeto colmata: **integração de social story + sensores ambientais + feedback multimodal + gestão de imprevistos** numa solução única e de baixo custo.

## Estrutura do código (Next.js)

```
missao-casa-banho/
├── app/
│   ├── layout.js                    # layout global (fonte, fundo)
│   ├── page.js                      # ecrã de boas-vindas
│   ├── globals.css                  # estilos globais Tailwind
│   ├── missoes/
│   │   └── page.tsx                 # menu de missões (grelha 2x2: 3 missões + conquistas)
│   ├── conquistas/
│   │   └── page.js                  # álbum de conquistas (grelha 5x2 de autocolantes)
│   ├── missao/
│   │   └── [tipo]/
│   │       ├── page.js              # passo atual da missão
│   │       └── recompensa/page.js   # recompensa
│   ├── ajuda/
│   │   ├── page.tsx                 # menu de ajuda (4 cartões 2x2)
│   │   ├── papel/page.tsx           # sub-ecrã papel (2 opções)
│   │   ├── demo/page.tsx            # demonstração guiada Tipo A
│   │   └── enviado/page.tsx         # confirmação calma Tipo B
│   ├── jogo/
│   │   ├── page.js                  # introdução do mini-jogo
│   │   ├── jogar/page.js            # jogo ativo (priming + rondas)
│   │   └── celebracao/page.js       # ecrã de vitória + estrelas
│   └── cuidador/
│       └── page.js                  # dashboard PIN-gated
├── components/
│   ├── BotaoFisicoIndicador.jsx     # representa um botão físico
│   ├── BotaoMenu.tsx                # botão vermelho do 5º botão físico (tecla 'm')
│   ├── CartaoAjuda.tsx              # cartão de opção do ecrã /ajuda
│   ├── CartaoMissao.jsx             # cartão clicável do menu
│   ├── EcraPerguntaBinaria.jsx      # ecrã reutilizável de pergunta com 2 opções
│   ├── Autocolante.jsx              # autocolante do álbum de conquistas
│   ├── HeaderAjuda.tsx              # header amarelo do contexto de ajuda
│   ├── help-icons.tsx               # pictogramas SVG do ecrã /ajuda
│   ├── BarraProgresso.jsx           # 6 pontos de progresso
│   ├── BarraProgressoJogo.jsx       # progresso do mini-jogo
│   ├── CaixaDestino.jsx             # caixa numerada (vazia/atual/preenchida)
│   ├── CartaoPasso.jsx              # cartão de opção baralhada
│   ├── HeaderApp.jsx                # header com nome + estrelas
│   └── HeroiAnimado.jsx             # imagem do herói por etapa
├── lib/
│   ├── teclado.ts                   # hook useBotoesFisicos
│   ├── missoes.ts                   # definição das missões, passos e ENTRADAS_MENU (grelha 2x2)
│   ├── conquistas.js                # sistema de conquistas/autocolantes (estado em memória)
│   ├── notificacoesAjuda.ts         # mock + estado em memória da chamada
│   ├── estrelasContext.tsx           # React Context para estrelas globais
│   ├── jogoDados.js                 # níveis, passos e frases do mini-jogo
│   └── perfilSensorial.js           # configuração do utilizador
├── public/
│   ├── herois/                      # imagens das poses
│   └── pictogramas/                 # ícones das missões
└── CLAUDE.md
```

## Convenções de código

- **Componentes em PascalCase** (`CartaoMissao.jsx`)
- **Funções e variáveis em camelCase** mas com termos em português (`moverFocoEsquerda`, `iniciarMissao`)
- **Comentários em português** sempre que descrevam intenção pedagógica ou de UX
- **Tailwind classes inline** — não criar CSS modules a menos que seja estritamente necessário
- **Sem libraries de UI prontas** (shadcn/ui está OK, mas Material UI ou Chakra não — fica genérico demais)
- **Sem TypeScript**

## Hook crítico: detetar botões físicos

```ts
// lib/teclado.ts
import { useEffect } from 'react';

export function useBotoesFisicos({ onAnterior, onSeguinte, onEscolher, onAjuda, onMenu }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')            onAnterior?.();
      else if (e.key === 'ArrowRight')      onSeguinte?.();
      else if (e.key === 'Enter')           onEscolher?.();
      else if (e.key.toLowerCase() === 'h') onAjuda?.();
      else if (e.key.toLowerCase() === 'm') onMenu?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onAnterior, onSeguinte, onEscolher, onAjuda, onMenu]);
}
```

Uso típico numa página (com botão Menu — ecrãs que não são boas-vindas nem menu):
```tsx
useBotoesFisicos({
  onAnterior: () => setFoco(f => Math.max(0, f - 1)),
  onSeguinte: () => setFoco(f => Math.min(opcoes.length - 1, f + 1)),
  onEscolher: () => irPara(opcoes[foco].rota),
  onAjuda:    () => router.push('/ajuda'),
  onMenu:     () => router.push('/missoes'),
});
```

## Sistema de Ajuda

Quando a criança carrega no botão amarelo, está provavelmente em **stress**
(sujou-se, deixou cair o papel, não consegue limpar-se). O sistema de Ajuda
respeita estritamente este contexto pedagógico:

- **Carga cognitiva mínima** — máximo 4 opções, grelha 2x2 (não 1x4),
  pictogramas grandes, sem figuras humanas nos ícones.
- **Mudança visual clara de contexto** (Nielsen #1) — fundo amarelo pastel
  `#FFFAE5` → `#FFF4D1` distingue-se do azul do resto da app.
- **Linguagem positiva, sem culpa** — "Diz-me o que se passa, eu ajudo-te";
  "está tudo bem"; nunca "errado", "falhaste", "tens a certeza?".

### Arquitetura Tipo A / Tipo B

As respostas do sistema dividem-se em dois tipos:

- **Tipo A — Resolução guiada** (`/ajuda/demo`): a app mostra uma
  mini-sequência visual de 2-3 passos com o herói/heroína a demonstrar a
  solução. Promove **autonomia e autoeficácia**. No final pergunta
  "Conseguiste?" com duas opções: "Sim!" (volta à missão) ou "Preciso de
  ajuda" (escala para Tipo B).

- **Tipo B — Chamada de adulto** (`/ajuda/enviado`): notifica o cuidador
  via console.log (mock). Requer intervenção física impossível para a
  criança. Mostra ecrã calmo "Já chamei um adulto" com contador de tempo.

### Ecrãs

| Rota              | Função                                                        |
|-------------------|---------------------------------------------------------------|
| `/ajuda`          | 4 cartões em grelha 2x2 (menu principal de ajuda)             |
| `/ajuda/papel`    | Sub-ecrã com 2 opções: "Caiu ao chão" / "Não há papel"       |
| `/ajuda/demo`     | Demonstração guiada Tipo A (2-3 passos + "Conseguiste?")      |
| `/ajuda/enviado`  | Confirmação calma Tipo B + contador de tempo decorrido         |

### As 4 opções de ajuda

| Key                | Título visível              | Cor placa    | Tipo   | Destino              |
|--------------------|-----------------------------|--------------|--------|----------------------|
| `naoseicomosefaz`  | Não sei como se faz         | `#E3F2FD`    | A      | `/ajuda/demo`        |
| `barulho`          | Tenho medo do barulho       | `#F3E5F5`    | A      | `/ajuda/demo`        |
| `papel`            | Problema com o papel        | `#FFF8DC`    | Misto  | `/ajuda/papel`       |
| `adulto`           | Preciso de um adulto        | `#FCE4EC`    | B      | `/ajuda/enviado`     |

### Sub-ecrã: Problema com o papel (`/ajuda/papel`)

Duas opções lado a lado:
- **"Caiu ao chão"** → Tipo A (`/ajuda/demo?tipo=papelcaiu`)
- **"Não há papel"** → Tipo B (`/ajuda/enviado?tipo=papel`)

### Demonstração guiada (`/ajuda/demo`)

Recebe `?tipo=naoseicomosefaz|barulho|papelcaiu`. Fundo verde pastel
`#E8F5E9` → `#C8E6C9` ("está tudo bem, vamos resolver").

**Conteúdo por tipo:**

- **"Não sei como se faz"** — 1 passo: repete a instrução e imagem do passo
  da missão onde a criança estava.
- **"Tenho medo do barulho"** — 3 passos: "Tapa os ouvidos assim" →
  "O barulho é curtinho" (countdown 3-2-1) → "Boa, já passou!"
- **"Papel caiu ao chão"** — 3 passos: "Apanha o papel" → "Põe no lixo" →
  "Tira um bocadinho novo"

**Final (todos os tipos):** ecrã "Conseguiste?" com dois cartões:
- "Sim!" (verde) → celebração breve (1.5s) → volta à missão
- "Preciso de ajuda" (rosa) → escala para `/ajuda/enviado`

### Botões físicos no contexto de Ajuda

| Botão        | `/ajuda`                    | `/ajuda/papel`              | `/ajuda/demo`            | `/ajuda/enviado`                 |
|--------------|-----------------------------|-----------------------------|--------------------------|----------------------------------|
| Anterior `←` | Move foco (loop)            | Move foco (loop)            | Volta ao passo anterior  | **Desativado** (50%)             |
| Seguinte `→` | Move foco (loop)            | Move foco (loop)            | Avança passo             | **Desativado** (50%)             |
| Escolher ✓   | Confirma opção em foco      | Confirma opção em foco      | Avança / confirma        | "Estou bem" — retoma missão      |
| Ajuda `h`    | **Desativado**              | **Desativado**              | **Desativado**           | "Mudar opção" → `/ajuda`         |
| Menu `m`     | Volta ao menu               | Volta ao menu               | Volta ao menu            | Volta ao menu (limpa estado)     |

### Persistência da chamada

Para a criança poder **retomar o passo onde estava**, guardamos em **memória
de módulo** (não localStorage) a rota de origem e o passo. Ver
`lib/notificacoesAjuda.ts`:

```ts
iniciarChamada({ tipo, rotaOrigem: '/missao/xixi', passoOrigem: 3, inicio: new Date() })
obterChamada()    // EstadoChamada | null
terminarChamada() // limpa quando a missão é retomada/abandonada
```

O ecrã de passo passa o passo no URL (`?p=N`) ao retomar para que o
`useState` inicial reponha o passo corretamente.

### Notificação ao cuidador (mock)

`enviarNotificacaoAjuda(tipo, contexto)` em `lib/notificacoesAjuda.ts` faz
`console.log` estruturado por agora. A notificação só é enviada nos fluxos
de **Tipo B** (chamada de adulto). Substituir por chamada HTTP/WebSocket
ao Pi/dashboard sem mexer em quem chama:

```
[AJUDA] Tiago precisa de ajuda na casa de banho
Tipo: Pediu adulto
Missão: Chichi · Passo 4 de 6 (Limpa com papel.)
Hora: 15:32:41
```

Se a criança permanecer 2 minutos em `/ajuda/enviado` sem ação, é emitida
uma **notificação reforçada** (também console.log por agora).

## Mini-Jogo de Ordenação

Jogo pedagógico onde a criança reconstrói a sequência dos passos da rotina.
Complementa as missões (aprendizagem passiva) com **aprendizagem ativa**.

### Ecrãs

| Rota                  | Função                                                    |
|-----------------------|-----------------------------------------------------------|
| `/jogo`               | Introdução — mostra nível e botão "Começar"               |
| `/jogo/jogar`         | Jogo ativo — priming (3s) → rondas de ordenação           |
| `/jogo/celebracao`    | Vitória — estrelas (1-3) conforme erros + confetti         |

### Níveis de dificuldade (`lib/jogoDados.js`)

| Nível   | Passos | Conteúdo                                                      |
|---------|--------|---------------------------------------------------------------|
| Fácil   | 3      | Sentar → Autoclismo → Lavar mãos                             |
| Normal  | 5      | Entrar → Sentar → Limpar → Autoclismo → Lavar                |
| Difícil | 7      | Entrar → Calças → Sentar → Limpar → Autoclismo → Lavar → Secar |

O nível default é Fácil. Futuramente configurável no dashboard do cuidador.

### Fluxo do jogo

1. **Priming** (3s): mostra os passos na ordem correta com imagens
2. **Countdown** (3-2-1): imagens desaparecem com fade-out
3. **Rondas**: a criança escolhe o passo correto entre opções baralhadas
   - Acerto: cartão voa para a caixa destino, feedback positivo do herói
   - Erro: shake suave, mensagem encorajadora (sem cor vermelha)
   - Último cartão: colocado automaticamente (evita clique redundante)
4. **Celebração**: 1-3 estrelas somadas ao total global

### Sistema de estrelas (`lib/estrelasContext.tsx`)

React Context global (`EstrelasProvider` no layout) que gere o total de
estrelas da sessão. Usado pelo jogo e pelas missões.

```js
const { estrelas, atualizarEstrelas } = useEstrelas()
atualizarEstrelas(2) // soma 2 ao total
```

Cálculo do jogo: 0 erros → 3 estrelas, 1-2 erros → 2 estrelas, 3+ → 1.

### Botões físicos no jogo

| Botão        | `/jogo`          | `/jogo/jogar`              | `/jogo/celebracao`         |
|--------------|------------------|----------------------------|----------------------------|
| Anterior `←` | **Desativado**   | Move foco (loop)           | Move foco entre botões     |
| Seguinte `→` | **Desativado**   | Move foco (loop)           | Move foco entre botões     |
| Escolher ✓   | Começar jogo     | Confirma cartão em foco    | Confirma botão em foco     |
| Ajuda `h`    | **Desativado**   | Mostra dica (pisca correto)| **Desativado**             |
| Menu `m`     | Volta ao menu    | Confirmação de saída       | Volta ao menu              |

## Acessibilidade — checklist sempre

- [ ] Contraste de texto ≥ 4.5:1 (WCAG AA)
- [ ] Cor nunca como único indicador (sempre + ícone + texto)
- [ ] Targets visuais ≥ 72×72px (mesmo sem touch, é o tamanho que a criança vê)
- [ ] Sem flashes, sem autoplay de som alto
- [ ] Toda a narração é desativável
- [ ] Toda a animação respeita `prefers-reduced-motion`
- [ ] Linguagem em frases ≤ 8 palavras
- [ ] Fonte testada com caracteres portugueses (`á é í ó ú ç ã õ`)

## Onde NÃO ir

- **Não usar `localStorage` para dados sensíveis** — o cuidador configura via UI separada PIN-gated
- **Não meter dados pessoais reais** em hard-code (Tomás/Leonor são proto-personas, não pessoas reais)
- **Não copiar imagens/assets de marcas comerciais** (Toca Boca, Khan Academy etc. — são inspiração, não fonte)
- **Não usar fontes que não suportem português**
- **Não fazer ecrãs com mais de 3 elementos clicáveis** simultaneamente
- **Não mostrar erros vermelhos** — usar linguagem positiva ("Tenta outra vez", não "Errado!")
- **Não autoplay de áudio** sem o cuidador o permitir nas configurações

## Estado atual do trabalho

- [x] Ideação (Fase 1)
- [x] Avaliação intermédia (Fase 2)
- [x] Proto-personas
- [x] Análise de tarefas
- [x] Requisitos
- [x] Arquitetura
- [x] SoA com 5 papers
- [x] Imagens do herói (várias poses geradas)
- [x] Imagem da heroína (geradas, mas a refazer com fato vestido)
- [/] Protótipo Figma — em curso (ecrã de boas-vindas feito)
- [ ] Ecrã de menu de missões (Figma)
- [ ] Ecrã de passo (Figma)
- [ ] Ecrã de recompensa (Figma)
- [x] Mini-jogo (Figma)
- [x] Mini-jogo (implementação Next.js) — `/jogo`, `/jogo/jogar`, `/jogo/celebracao`
- [x] Menu de missões em grelha 2x2 com cartão "Conquistas" (Next.js)
- [x] Álbum de conquistas — `/conquistas` (grelha 5x2 de autocolantes)
- [x] Componente reutilizável `EcraPerguntaBinaria` (pergunta + 2 opções)
- [x] Ecrã "Conseguiste?" redesenhado com `EcraPerguntaBinaria`
- [ ] Ecrã de imprevistos (Figma)
- [ ] Dashboard cuidador (Figma)
- [ ] Restante implementação Next.js
- [ ] Integração Raspberry Pi + GPIO
- [ ] Relatório final
- [ ] Apresentação e defesa

## Comandos úteis

```bash
# Desenvolvimento
npm run dev          # arrancar em http://localhost:3000

# Build de produção
npm run build
npm start

# No Raspberry Pi (depois de clonar)
sudo apt install nodejs npm
npm install
npm run build
npm start            # arranca o servidor

# E em paralelo, o script Python para os botões GPIO
python3 botoes_gpio.py
```

## Notas para Claude Code

Quando pedires ajuda:

- Usa **português europeu** (não brasileiro) para todo o texto da UI e comentários.
- Pensa **sempre primeiro na criança** com PEA — se uma decisão técnica complica a UX, escolhe a solução mais simples mesmo que seja menos elegante a nível de código.
- A **previsibilidade vale mais que a originalidade** — não introduzas variações de layout entre ecrãs sem motivo forte.
- Antes de adicionar uma library, pergunta-te se Tailwind + React puro resolvem.
- O ecrã é **sempre landscape** (monitor) — não otimizar para mobile portrait.
- Há **5 botões físicos** + zero touch — desenhar sempre como se o rato e o teclado normais não existissem.