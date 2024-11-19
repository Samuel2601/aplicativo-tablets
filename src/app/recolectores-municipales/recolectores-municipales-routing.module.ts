import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormularioSocioeconomicoComponent } from './formulario-socioeconomico/formulario-socioeconomico.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'formulario',
                component: FormularioSocioeconomicoComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RecolectoresMunicipioRoutingModule {}
