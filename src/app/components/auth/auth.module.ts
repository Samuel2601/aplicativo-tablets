import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {
    RECAPTCHA_V3_SITE_KEY,
    RecaptchaModule,
    RecaptchaV3Module,
} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportsModule } from '../../service/import';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RecaptchaV3Module,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaModule,
        ImportsModule,
    ],
    declarations: [],
    providers: [
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.recaptcha.siteKey,
        },
    ],
})
export class AuthModule {}
