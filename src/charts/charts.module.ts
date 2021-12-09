import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDirective } from './chart.directive';

@NgModule({
  declarations: [
    ChartDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChartDirective,
  ]
})
export class ChartsModule { }
