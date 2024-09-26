import { Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { BestPComponent } from './best-p/best-p.component'; 
import { WeAreComponent } from './we-are/we-are.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path: '', redirectTo: 'weAre', pathMatch: 'full'},
    {path: 'catalogo', component: CatalogoComponent },
    {path: 'bestP', component: BestPComponent},
    {path: 'weAre', component: WeAreComponent},
    {path: 'contact', component: ContactComponent},
];
