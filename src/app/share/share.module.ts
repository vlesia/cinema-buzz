import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [ButtonComponent, ContainerComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, ContainerComponent]
})
export class ShareModule {}
