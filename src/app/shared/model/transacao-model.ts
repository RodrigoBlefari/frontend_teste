class Transacao {
    Tipo: TipoTransacao
    Mercadoria: String
    Valor: number
}

enum TipoTransacao {
    Comprar = 0,
    Vender = 1
}

export { Transacao, TipoTransacao }