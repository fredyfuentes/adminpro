import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObserbable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error', error),
      () => console.log('Observador termino')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscripcion.unsubscribe();
  }



  regresaObserbable(): Observable<any> {
    return new Observable((obserser: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        obserser.next(salida);
        // if (contador == 3) {
        //   clearInterval(intervalo);
        //   obserser.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   obserser.error('Se produjo un error');
        // }
      }, 1000);
    }).pipe(map(resp => resp.valor ), filter((valor, index) => {
      if ((valor % 2) === 1) {
        return true;
      } else {
        return false;
      }
    }));
  }

}
