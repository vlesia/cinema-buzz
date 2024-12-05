import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { FavoriteListComponent } from './favorite-list.component';
import { ShareModule } from '../../share/share.module';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [FavoriteItemComponent, FavoriteListComponent],
  imports: [CommonModule, ShareModule, FavoriteRoutingModule],
  exports: [FavoriteListComponent]
})
export class FavoriteModule {}
