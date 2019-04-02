import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transacao, TipoTransacao } from '../shared/model/transacao-model';
import { TransacaoService } from '../shared/service/transacao.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
  providers: [TransacaoService]
})
export class PainelComponent implements OnInit {

  transacaoForm = new FormGroup({
    tipoTransacao: new FormControl('', Validators.required),
    mercadoria: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required)
  });

  transacao: Transacao = new Transacao;
  transacoes: Transacao[] = [];

  constructor(private transacaoService: TransacaoService) { }

  ngOnInit() {

    this.recuperaTransacoes();

  }

  recuperaTransacoes() {
    this.transacoes = this.transacaoService.pegarTranscacoes();
  }

  inseriTransacoes(transacoes: Transacao[]) {
    this.transacaoService.inserirTransacoes(transacoes);
  }

  onSubmit() {
    if (this.transacaoForm.valid) {
      this.transacao.Mercadoria = this.transacaoForm.value.mercadoria;
      this.transacao.Valor = this.transacaoForm.value.valor;
      this.transacao.Tipo = this.transacaoForm.value.tipoTransacao == 0 ? TipoTransacao.COMPRAR : TipoTransacao.VENDER;
      this.transacoes.push(this.transacao);
      this.inseriTransacoes(this.transacoes);
      this.transacao = new Transacao;
      console.table(this.transacao);
    }
  }
}
