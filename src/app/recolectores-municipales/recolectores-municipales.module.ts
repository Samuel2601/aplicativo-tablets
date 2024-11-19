import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecolectoresMunicipioRoutingModule } from './recolectores-municipales-routing.module';

import { ImportsModule } from 'src/app/service/import';
import { FormularioSocioeconomicoComponent } from './formulario-socioeconomico/formulario-socioeconomico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FormularioSocioeconomicoComponent],
    imports: [
        RecolectoresMunicipioRoutingModule,
        CommonModule,
        ImportsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class RecolectoresMunicipalesModule {}
