import { Injectable } from '@angular/core';
import { environment } from 'enviroments/enviroment';
import { Observable, Observer } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  private socketIO;

  constructor() { 
    this.socketIO = io(environment.SOCKET_ENDPOINT);
  }

  onDataFromServer = () => {
    return new Observable((observer: Observer<any>) => {
      this.socketIO.on('dataFromServer', (data) => {
        console.log('statusGpio')
        observer.next(data);
      })
    })
  }

  on = "A8 01 06 01 06 00 01 00 01 FF";
  off = "A8 01 06 01 06 00 01 00 00 FF";
  onTurnBombaOn(){
    this.socketIO.emit("SendaData",JSON.stringify(this.on.split(' ').join('')));
  }
}
