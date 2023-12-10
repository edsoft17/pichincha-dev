import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'p-button',
  templateUrl: './p-button.component.html',
  styleUrls: ['./p-button.component.css']
})
export class PButtonComponent {
  @Input() text!: string;
  @Input() style!: string;
  @Input() padding!: number;
  @Input() nameForm?: string;
}
