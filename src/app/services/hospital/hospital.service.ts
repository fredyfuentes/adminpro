import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {
    const url = `${URL_SERVICIOS}/hospital/?desde=${desde}`;
    return this.http.get(url).pipe(map((resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  obtenerHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  buscarHospital(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  borrarHospital(id: string) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;
    return this.http.delete(url).pipe(map((resp: any) => {
      swal('Hospital borrado', `El hospital ${resp.hospital.nombre} ha sido borrado`, 'success');
      return true;
    }));
  }

  crearHospital(nombre: string) {
    const url = `${URL_SERVICIOS}/hospital/?token=${this._usuarioService.token}`;
    const hospital = new Hospital(nombre);
    return this.http.post(url, hospital).pipe(map((resp: any) => {
      swal('Hospital creado', nombre, 'success');
      return resp.hospital;
    }));
  }

  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}/?token=${this._usuarioService.token}`;
    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Hospital actualizado', hospital.nombre, 'success');
      console.log(resp);
      return true;
    }));
  }
}
