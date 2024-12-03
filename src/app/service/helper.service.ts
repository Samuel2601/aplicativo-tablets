import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import * as CryptoJS from 'crypto-js';
import { SpinnerComponent } from 'src/app/layout/spinner.component';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
@Injectable({
    providedIn: 'root',
})
export class HelperService {
    private deshabilitarMapaSubject = new Subject<void>();
    deshabilitarMapa$ = this.deshabilitarMapaSubject.asObservable();
    public key = 'labella'; //'buzon';
    llamadasActivas = 0;
    spiner: any = null;

    constructor(private dialogService: DialogService, private router: Router) {}

    isMobil(): boolean {
        return Capacitor.isNativePlatform(); //window.innerWidth <= 575; //
    }

    async isAndroid(): Promise<boolean> {
        const info = await Device.getInfo();
        return info.platform === 'android';
    }

    applySafeAreaCSS(): void {
        // Agrega una clase específica al body para aplicar los estilos de safe area en iOS
        document.body.classList.add('safe-area-ios');
    }
    deshabilitarMapa() {
        this.deshabilitarMapaSubject.next();
    }

    encryptData(data: string, key: string): string {
        const dataString = data ? 'true' : 'false';
        return CryptoJS.AES.encrypt(dataString, key).toString();
    }

    encryptDataLogin(data: string, key: string): string {
        return CryptoJS.AES.encrypt(data, key).toString();
    }

    decryptDataLogin(encryptedData: string): string {
        return CryptoJS.AES.decrypt(encryptedData, this.key).toString(
            CryptoJS.enc.Utf8
        );
    }

    decryptData(encryptedData: string): boolean {
        const encrypte =
            sessionStorage.getItem(encryptedData) ||
            localStorage.getItem(encryptedData);
        if (encrypte) {
            return !!CryptoJS.AES.decrypt(encrypte, this.key).toString(
                CryptoJS.enc.Utf8
            );
        }
        return false;
    }

    llamarspinner(id: any) {
        //console.log('LLAMO', id);
        if (this.llamadasActivas === 0 && this.spiner == null) {
            // Verifica si el spinner no está ya abierto
            this.spiner = this.dialogService.open(SpinnerComponent, {
                header: 'Cargando',
                dismissableMask: true,
                width: 'auto',
                closable: false,
            });
        }
        this.llamadasActivas++;
    }

    cerrarspinner(id: any) {
        this.llamadasActivas--;
        //console.log("CERRO",id);
        // console.log(`Llamadas activas: ${this.llamadasActivas}`);

        if (this.llamadasActivas == 0) {
            setTimeout(() => {
                if (this.spiner !== null) {
                    try {
                        this.spiner.close();
                        // console.log('Intentando destruir el spinner');
                        this.spiner.destroy();
                        this.spiner = null; // Asegúrate de establecerlo a null después de destruirlo
                        //console.log('Spinner destruido correctamente');
                    } catch (error) {
                        console.error('Error closing spinner:', error);
                    }
                } else {
                    // console.log('Spinner ya es null, no es necesario destruirlo');
                }
            }, 1000);
        } else {
            // console.log('Aún hay llamadas activas, no se destruye el spinner');
        }
    }

    showLoading() {
        this.llamarspinner('helper');
    }

    hideLoading() {
        this.cerrarspinner('helper');
    }

    navigateToUrlWithDelay(url: string, delay: number) {
        setTimeout(() => {
            this.router.navigate([url]);
        }, delay);
    }

    construirFiltros(
        filtroServicio: string[],
        valorServicio: any[]
    ): { [key: string]: any } {
        //console.log(filtroServicio, valorServicio);
        // Construir el objeto de filtros
        const filtros: { [key: string]: any } = {};
        try {
            // Verificar si los arrays tienen la misma longitud
            if (filtroServicio.length !== valorServicio.length) {
                console.error(
                    'Los arrays de filtros y valores deben tener la misma longitud'
                );
                return {};
            }

            // Si los arrays están vacíos, devolver un objeto vacío
            if (filtroServicio.length === 0 || valorServicio.length === 0) {
                return {};
            }

            for (let i = 0; i < filtroServicio.length; i++) {
                filtros[filtroServicio[i]] = valorServicio[i];
            }
            //console.log(filtros);
            return filtros;
        } catch (error) {
            console.error(error);
            return filtros;
        }
    }
}
