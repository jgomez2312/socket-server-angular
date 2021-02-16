import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  msgSubcription: Subscription;

  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(public chat: ChatService
              ) { }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes');

    this.msgSubcription = this.chat.getMessage().subscribe( msg => {
      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(){
    this.msgSubcription.unsubscribe() ;
  }

  enviar(){
    
    if (this.texto.trim().length === 0) {
      return;
    }

    this.chat.sendMessage(this.texto);
    this.texto = '';
  }

}
