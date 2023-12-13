import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader"></div>
  `,
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {

}
