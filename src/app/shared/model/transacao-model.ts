class Transacao {
    Tipo: TipoTransacao
    Mercadoria: String
    Valor: number
}

enum TipoTransacao {
    COMPRAR = 0,
    VENDER = 1,
    TODAS = 2
}

export { Transacao, TipoTransacao }