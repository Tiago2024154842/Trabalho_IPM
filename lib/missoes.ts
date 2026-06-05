export type TipoMissao = 'xixi' | 'coco' | 'maos'

/** Entrada no menu principal (missões + conquistas). */
export interface EntradaMenu {
  id: string
  titulo: string
  plate: 'sky-soft' | 'mint-soft' | 'sun-soft' | 'coral-soft'
  tipo?: TipoMissao
  rota: string
}

export interface Passo {
  instrucao: string  // ≤ 8 palavras
  dica: string       // texto extra no ecrã de ajuda
  imagem: string     // caminho relativo a /public
  som?: string       // narração em /public/sons (sem extensão); opcional
}

export interface Missao {
  tipo: TipoMissao
  titulo: string
  plate: 'sky-soft' | 'mint-soft' | 'sun-soft'
  passos: Passo[]
}

export const MISSOES: Record<TipoMissao, Missao> = {
  xixi: {
    tipo: 'xixi',
    titulo: 'Chichi',
    plate: 'sun-soft',
    passos: [
      { instrucao: 'Fecha a porta.',              dica: 'Empurra a porta devagar até fazer clique.', imagem: '/herois/porta.png',    som: 'fecha_a_porta' },
      { instrucao: 'Baixa as calças e a cueca.',  dica: 'Puxa as calças até aos joelhos.',           imagem: '/herois/heroi3.png',   som: 'calcas' },
      { instrucao: 'Senta-te na sanita.',         dica: 'Senta bem no meio da sanita.',              imagem: '/herois/heroi2.png',   som: 'sentate_na_sanita' },
      { instrucao: 'Faz chichi.',                 dica: 'Fica sentado e espera até terminar.',       imagem: '/herois/heroi1.png',   som: 'xixi' },
      { instrucao: 'Limpa com papel.',            dica: 'Pega num pouco de papel e limpa.',          imagem: '/herois/heroi6.png',   som: 'limpa-te' },
      { instrucao: 'Puxa o autoclismo.',          dica: 'Carrega no botão ou puxa o puxador.',       imagem: '/herois/descarga.png', som: 'puxar_autoclismo' },
    ],
  },
  coco: {
    tipo: 'coco',
    titulo: 'Cocó',
    plate: 'mint-soft',
    passos: [
      { instrucao: 'Fecha a porta.',              dica: 'Empurra a porta devagar até fazer clique.', imagem: '/herois/porta.png',    som: 'fecha_a_porta' },
      { instrucao: 'Baixa as calças e a cueca.',  dica: 'Puxa as calças até aos joelhos.',           imagem: '/herois/heroi1.png',   som: 'calcas' },
      { instrucao: 'Senta-te bem na sanita.',     dica: 'Senta bem no meio e relaxa.',               imagem: '/herois/heroi1.png',   som: 'sentate_na_sanita' },
      { instrucao: 'Faz cocó.',                   dica: 'Fica sentado e espera. Sem pressa.',        imagem: '/herois/heroi2.png',   som: 'coco' },
      { instrucao: 'Limpa com papel higiénico.',  dica: 'Limpa bem. Podes usar mais papel.',         imagem: '/herois/heroi6.png',   som: 'limpa-te' },
      { instrucao: 'Puxa o autoclismo.',          dica: 'Carrega no botão ou puxa o puxador.',       imagem: '/herois/descarga.png', som: 'puxar_autoclismo' },
    ],
  },
  maos: {
    tipo: 'maos',
    titulo: 'Lavar as Mãos',
    plate: 'sky-soft',
    passos: [
      { instrucao: 'Abre a torneira.',              dica: 'Roda o manípulo para a esquerda.',      imagem: '/herois/abrirtorneira.png', som: 'torneira' },
      { instrucao: 'Molha bem as mãos.',            dica: 'Passa as duas mãos pela água.',          imagem: '/herois/lavamaos.png',      som: 'molha' },
      { instrucao: 'Põe sabão nas mãos.',           dica: 'Carrega na bomba de sabão uma vez.',     imagem: '/herois/sabonete.png',      som: 'sabao' },
      { instrucao: 'Esfrega as mãos 20 segundos.', dica: 'Conta até 20 enquanto esfregas.',         imagem: '/herois/lavamaos.png',      som: 'esfrega' },
      { instrucao: 'Passa as mãos por água.',       dica: 'Passa até o sabão desaparecer.',         imagem: '/herois/lavamaos.png',      som: 'passa' },
      { instrucao: 'Seca com a toalha.',            dica: 'Seca bem os dois lados das mãos.',       imagem: '/herois/toalha.png',        som: 'seca' },
    ],
  },
}

export const LISTA_MISSOES: Missao[] = [
  MISSOES.xixi,
  MISSOES.coco,
  MISSOES.maos,
]

/** Entradas do menu principal (grelha 2x2). */
export const ENTRADAS_MENU: EntradaMenu[] = [
  { id: 'xixi', titulo: 'Chichi',          plate: 'sun-soft',   tipo: 'xixi', rota: '/missao/xixi' },
  { id: 'coco', titulo: 'Cocó',            plate: 'mint-soft',  tipo: 'coco', rota: '/missao/coco' },
  { id: 'maos', titulo: 'Lavar as Mãos',   plate: 'sky-soft',   tipo: 'maos', rota: '/missao/maos' },
  { id: 'conquistas', titulo: 'Conquistas', plate: 'coral-soft', rota: '/conquistas' },
]