import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from "./brand/brand.component";
import { CatalogoComponent } from './catalogo/catalogo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BrandComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TechMarketSI';
}
