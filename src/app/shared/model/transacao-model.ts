class Transacao {
    Tipo: TipoTransacao
    Mercadoria: String
    Valor: number
}

enum TipoTransacao {
    COMPRAR = 0,
    VENDER = 1
}

export { Transacao, TipoTransacao }