import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() customClass: string | string[] = '';
  @Output() onClick = new EventEmitter<Event>();
  @Input() useContent = false;

  handleClick(event: Event): void {
    this.onClick.emit(event);
  }
}
