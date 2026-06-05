/* Lógica de notificação ao cuidador.
 * Mock para já — apenas console.log estruturado. Substituir por HTTP/WebSocket
 * no futuro sem alterar quem chama estas funções. */

/** Tipos de pedido de ajuda:
 *  A = resolvido pela app (autonomia)
 *  B = requer adulto */
export type TipoAjuda =
  | 'naoseicomosefaz'  // Tipo A — repete o passo atual
  | 'barulho'          // Tipo A — demonstração anti-stress
  | 'papelcaiu'        // Tipo A — apanhar e substituir papel
  | 'papelnaoh'        // Tipo B — não há papel (adulto traz)
  | 'adulto'           // Tipo B — chamada geral
  | 'indefinido'       // placeholder antes de a criança escolher

export interface ContextoAjuda {
  nomeCrianca: string
  missaoAtual: string
  passoAtual: number
  totalPassos: number
  rotuloPasso: string
  timestamp: Date
}

const ROTULO_TIPO: Record<TipoAjuda, string> = {
  naoseicomosefaz: 'Não sabe como se faz',
  barulho:         'Medo do barulho',
  papelcaiu:       'Papel caiu (resolveu sozinho)',
  papelnaoh:       'Não há papel',
  adulto:          'Pediu adulto',
  indefinido:      'Tipo não definido',
}

function pad(n: number) { return n.toString().padStart(2, '0') }
function horaLegivel(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function enviarNotificacaoAjuda(tipo: TipoAjuda, ctx: ContextoAjuda) {
  const passoStr = ctx.totalPassos > 0
    ? `Missão: ${ctx.missaoAtual} · Passo ${ctx.passoAtual} de ${ctx.totalPassos} (${ctx.rotuloPasso})`
    : `Missão: ${ctx.missaoAtual}`
  console.log(
    `[AJUDA] ${ctx.nomeCrianca} precisa de ajuda na casa de banho\n` +
    `Tipo: ${ROTULO_TIPO[tipo]}\n` +
    `${passoStr}\n` +
    `Hora: ${horaLegivel(ctx.timestamp)}`
  )
}

/* Estado em memória da chamada em curso (sem localStorage). */
export interface EstadoChamada {
  tipo?: TipoAjuda   // opcional — preenchido quando a criança escolhe
  rotaOrigem: string
  passoOrigem: number
  inicio: Date
}

let chamadaAtual: EstadoChamada | null = null

export function iniciarChamada(e: EstadoChamada) { chamadaAtual = e }
export function obterChamada(): EstadoChamada | null { return chamadaAtual }
export function terminarChamada() { chamadaAtual = null }
export function rotuloTipo(t: TipoAjuda) { return ROTULO_TIPO[t] }
