import { Component, OnInit, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Output() dismiss = new EventEmitter();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    document.body.appendChild(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.element.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }

}
