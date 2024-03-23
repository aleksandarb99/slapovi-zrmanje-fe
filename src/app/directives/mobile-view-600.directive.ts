import { Directive, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from '../components/utils/header/header.component';

@Directive({
  selector: '[appMobileView600]'
})
export class MobileView600Directive implements OnInit {
  @ViewChild(HeaderComponent, {static : true}) headerComponent : HeaderComponent | undefined;
  @Output() screenWidth600 = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  private checkWindowSize(): void {
    const isMobile = window.innerWidth <= 600;
    this.screenWidth600.emit(isMobile);
  }
}
