import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _medicoService: MedicoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde).subscribe((resp: any) => {
      this.totalRegistros = this._medicoService.totalMedicos;
      this.medicos = resp;
      this.cargando = false;
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostarModal('medicos', id);
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this._medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicoService.borrarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
        });
      }
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }

}
