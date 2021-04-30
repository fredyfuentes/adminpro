import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  obtenerMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url).pipe(map((resp: any) => resp.medico));
  }

  cargarMedicos(desde: number = 0) {
    const url = `${URL_SERVICIOS}/medico/?desde=${desde}`;
    return this.http.get(url).pipe(map((resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  buscarMedico(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Médico borrado', `El médico ${resp.medico.nombre} ha sido borrado`, 'success');
      return true;
    }));
  }

  guardarMedico(medico: Medico) {
    let url = `${URL_SERVICIOS}/medico/`;
    if (medico._id) {
      url += `${medico._id}/`;
      url += `?token=${this._usuarioService.token}`;
      return this.http.put(url, medico).pipe(map((resp: any) => {
        swal('Médico actualizado', resp.medico.nombre, 'success');
        return resp.medico;
      }));
    } else {
      url += `?token=${this._usuarioService.token}`;
      return this.http.post(url, medico).pipe(map((resp: any) => {
        swal('Médico creado', resp.medico.nombre, 'success');
        return resp.medico;
      }));
    }
  }

}