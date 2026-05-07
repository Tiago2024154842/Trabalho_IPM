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
- (5º botão a definir — provavelmente VOLTAR ou REPETIR)

## Modelo de interação

A criança **não toca no ecrã**. Tudo é controlado pelos 5 botões físicos por baixo do monitor.

Em qualquer ecrã há sempre **uma opção em foco** (com moldura coral, etiqueta "EM FOCO" e ligeiramente maior). A criança:
- Move o foco com **ANTERIOR / SEGUINTE** (azuis)
- Confirma com **ESCOLHER / FEITO** (verde, maior)
- Pede ajuda com **AJUDA** (amarelo)

Os botões físicos têm cores que **correspondem aos elementos no ecrã**: o ✓ verde no ecrã está alinhado verticalmente com o botão verde físico. Esta consistência é intencional e deve ser mantida.

## Estrutura de ecrãs

```
1. Boas-vindas         (Olá, Tomás! + herói + COMEÇAR)
   ↓
2. Menu de missões     (Xixi / Cocó / Lavar Mãos)
   ↓
3. Passo da missão     (template, repete-se 6 vezes por missão)
   ↓
4. Recompensa          (Parabéns + estrelas)
   ↓
5. (volta ao menu)

Adicionais:
- Mini-jogo de ordenação (drag-and-drop por botões)
- Ecrã de imprevistos    (acessível via botão AJUDA)
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
│   │   └── page.js                  # menu de missões
│   ├── missao/
│   │   └── [tipo]/
│   │       ├── page.js              # passo atual da missão
│   │       └── recompensa/page.js   # recompensa
│   ├── ajuda/
│   │   └── page.js                  # ecrã de imprevistos
│   ├── jogo/
│   │   └── page.js                  # mini-jogo de ordenação
│   └── cuidador/
│       └── page.js                  # dashboard PIN-gated
├── components/
│   ├── BotaoFisicoIndicador.jsx     # representa um botão físico
│   ├── CartaoMissao.jsx             # cartão clicável do menu
│   ├── BarraProgresso.jsx           # 6 pontos de progresso
│   ├── HeaderApp.jsx                # header com nome + estrelas
│   └── HeroiAnimado.jsx             # imagem do herói por etapa
├── lib/
│   ├── teclado.js                   # hook useTeclado para botões físicos
│   ├── missoes.js                   # definição das missões e passos
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

```jsx
// lib/teclado.js
import { useEffect } from 'react';

export function useBotoesFisicos({ onAnterior, onSeguinte, onEscolher, onAjuda }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft' && onAnterior) onAnterior();
      else if (e.key === 'ArrowRight' && onSeguinte) onSeguinte();
      else if (e.key === 'Enter' && onEscolher) onEscolher();
      else if (e.key.toLowerCase() === 'h' && onAjuda) onAjuda();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onAnterior, onSeguinte, onEscolher, onAjuda]);
}
```

Uso típico numa página:
```jsx
useBotoesFisicos({
  onAnterior: () => setFoco(f => Math.max(0, f - 1)),
  onSeguinte: () => setFoco(f => Math.min(opcoes.length - 1, f + 1)),
  onEscolher: () => irPara(opcoes[foco].rota),
  onAjuda: () => router.push('/ajuda')
});
```

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
- [ ] Mini-jogo (Figma)
- [ ] Ecrã de imprevistos (Figma)
- [ ] Dashboard cuidador (Figma)
- [ ] Implementação Next.js
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