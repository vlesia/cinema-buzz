import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsComponent } from './movie-details.component';
import { ShareModule } from '../../share/share.module';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [CommonModule, ShareModule, MovieDetailsRoutingModule],
  exports: [MovieDetailsComponent],
})
export class MovieDetailsModule {}
