import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './guards/auth.guard'; // Importa tu guard
import { PermissionGuard } from './guards/permission.guard';
import { FormularioSocioeconomicoComponent } from './recolectores-municipales/formulario-socioeconomico/formulario-socioeconomico.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            redirectTo: 'formulario', // Redirige a tu componente predeterminado
                            pathMatch: 'full',
                        },
                        {
                            path: 'recolectores',
                            loadChildren: () =>
                                import(
                                    './recolectores-municipales/recolectores-municipales.module'
                                ).then((m) => m.RecolectoresMunicipalesModule),
                            //canActivate: [AuthGuard],
                        },
                        {
                            path: 'formulario',
                            component: FormularioSocioeconomicoComponent,
                        },
                    ],
                },

                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
