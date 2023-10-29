import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {
  isDarkHeader: boolean = false;
  path: string = "../../../assets/"
  reservationImage = `${this.path}/avatars/Reservation.png`;
  burgerImage = `${this.path}/avatars/Burger.png`;
  logoImage = `${this.path}/Logo.png`;
  isReservationSpread = false;
  isBurgerSpread = false;

  constructor(private el: ElementRef) {}

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollTop > 860) {
      this.isDarkHeader = true;
      this.reservationImage = `${this.path}/avatars/DarkReservation.png`;
      this.burgerImage = `${this.path}/avatars/DarkBurger.png`;
      this.logoImage = `${this.path}/DarkLogo.png`;
    } else {
      this.isDarkHeader = false;
      this.reservationImage = `${this.path}/avatars/Reservation.png`;
      this.burgerImage = `${this.path}/avatars/Burger.png`;
      this.logoImage = `${this.path}/Logo.png`;
    }
  }

  scrollToElement(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  changeReservationFlag(event: Event) {
    if (this.isBurgerSpread) {
      this.isBurgerSpread = false;
      return;
    }
    this.isReservationSpread = true;
    event.stopPropagation();
  }

  changeBurgerFlag(event: Event) {
    if (this.isReservationSpread) {
      this.isReservationSpread = false;
      return;
    }
    this.isBurgerSpread = true;
    event.stopPropagation();
  }

  revertFlags() {
    this.isReservationSpread = false;
    this.isBurgerSpread = false;
  }
}
