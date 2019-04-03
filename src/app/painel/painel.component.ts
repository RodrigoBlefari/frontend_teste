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
  valorTotal: number = 0;

  constructor(private transacaoService: TransacaoService) { }

  ngOnInit() {
    this.atualizaComponente();
  }

  atualizaComponente() {
    this.recuperaTransacoes();
    this.pegarTotal(TipoTransacao.TODAS);
  }

  recuperaTransacoes() {
    this.transacoes = [];
    this.transacoes = this.transacaoService.pegarTranscacoes();
  }

  inseriTransacoes(transacoes: Transacao[]) {
    this.transacaoService.inserirTransacoes(transacoes);
  }

  pegarTotal(filtro: number) {
    this.valorTotal = 0;    

    if (filtro == TipoTransacao.COMPRAR || filtro == TipoTransacao.TODAS)
      this.transacoes.filter(tra => tra.Tipo == TipoTransacao.COMPRAR).forEach(x => this.valorTotal = this.valorTotal - x.Valor);;

    if (filtro == TipoTransacao.VENDER || filtro == TipoTransacao.TODAS)
      this.transacoes.filter(tra => tra.Tipo == TipoTransacao.VENDER).forEach(x => this.valorTotal = this.valorTotal + x.Valor);;
    }

  retornaTipoTabela(tipo: number) {
    return tipo == TipoTransacao.COMPRAR ? "-" : "+";
  }

  filtro(tipo: number) {
    if(tipo != TipoTransacao.TODAS)
      this.transacoes = this.transacaoService.pegarTranscacoes().filter(tra => tra.Tipo == tipo);
    else
      this.transacoes = this.transacaoService.pegarTranscacoes();

    this.pegarTotal(tipo);
  }
  zerarTransacoes() {
    this.transacaoService.zerarTransacoes();    
    this.atualizaComponente();
    this.valorTotal = 0;

  }

  onSubmit() {
    if (this.transacaoForm.valid) {
      this.transacoes = this.transacaoService.pegarTranscacoes();
      this.transacao.Mercadoria = this.transacaoForm.value.mercadoria;
      this.transacao.Valor = Number.parseInt(this.transacaoForm.value.valor);
      this.transacao.Tipo = this.transacaoForm.value.tipoTransacao == 0 ? TipoTransacao.COMPRAR : TipoTransacao.VENDER;
      this.transacoes.push(this.transacao);
      this.inseriTransacoes(this.transacoes);
      this.transacao = new Transacao;
      this.atualizaComponente();
    }
  }
}
