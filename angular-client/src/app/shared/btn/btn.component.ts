import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rpt-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {

  @Input() text: string = "";
  @Input() loading: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
