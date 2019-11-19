import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ]
})
export class SharedModule { }
