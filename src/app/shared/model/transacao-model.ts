class Transacao {
    Tipo: TipoTransacao
    Mercadoria: string
    Valor: number
}

enum TipoTransacao {
    COMPRAR = 0,
    VENDER = 1
}

export { Transacao, TipoTransacao }
