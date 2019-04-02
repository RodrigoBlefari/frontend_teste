import { Injectable } from '@angular/core';
import { Transacao } from '../model/transacao-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  transacoes: Transacao[] = [];
  
  constructor() { }

  pegarTranscacoes() {
    const transacoes: Transacao[] = JSON.parse(localStorage.getItem('transacoes')); 
     
    if (transacoes) 
    {
      return transacoes;
    }
    return this.transacoes;
  }

  inserirTransacoes(transacoes: Transacao[]) {
    return localStorage.setItem('transacoes', JSON.stringify(transacoes));
  }
}
