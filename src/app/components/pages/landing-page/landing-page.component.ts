import { Component, ElementRef } from '@angular/core';
import { LandingPageSection } from 'src/app/model/landing-page-section.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
})
export class LandingPageComponent {
  isDarkHeader: boolean = false;
  path: string = '../../../assets/';
  reservationImage = `${this.path}/avatars/Reservation.png`;
  burgerImage = `${this.path}/avatars/Burger.png`;
  logoImage = `${this.path}/Logo.png`;
  isReservationSpread = false;
  isBurgerSpread = false;
  screenIsMoving = false;
  currentSectionIndex = 0;
  sections: LandingPageSection[] = [
    {
      title: 'NATURE BEAUTY',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum obcaecati dignissimos pariatur id recusandae, velitdebitis ab magni odit repudiandae fugiat doloremque porro id, sunt aliquam temporibus in voluptatem dignissimos. Doloribus autem nesciunt ipsum necessitatibus animi pariatur hic saepe maiores accusantium aut. Dolore quisquam dolorum accusantium quos! Voluptates cum, perferendis alias aut enim minima mollitia ea non, vel consequatur debitis ipsam earum provident nesciunt dolorum! Veritatis sequi blanditiis eaque voluptatibus consequuntur ipsam, aliquam culpa! Asperiores id, cupiditate eos nulla nemo obcaecati eligendi iure ullam earum, officia, eius omnis atque? Mollitia enim sapiente sequi perferendis consequuntur accusantium delectus odit laudantium eos et?  sapiente ducimus consequatur.',
      comment: "“This is by far the best view I've had from a restaurant!”",
      author: 'Bogdan Ilic',
      image: '../../../assets/temporaryPictures/Zrmanja1.png',
    },
    {
      title: 'RESTAURANT',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum obcaecati dignissimos pariatur id recusandae, velitdebitis ab magni odit repudiandae fugiat doloremque porro id, sunt aliquam temporibus in voluptatem dignissimos. Doloribus autem nesciunt ipsum necessitatibus animi pariatur hic saepe maiores accusantium aut. Dolore quisquam dolorum accusantium quos! Voluptates cum, perferendis alias aut enim minima mollitia ea non, vel consequatur debitis ipsam earum provident nesciunt dolorum! Veritatis sequi blanditiis eaque voluptatibus consequuntur ipsam, aliquam culpa! Asperiores id, cupiditate eos nulla nemo obcaecati eligendi iure ullam earum, officia, eius omnis atque? Mollitia enim sapiente sequi perferendis consequuntur accusantium delectus odit laudantium eos et?  sapiente ducimus consequatur.',
      comment:
        "“Great location, great food and absolute dream prices!! The 4 of us had three main courses and we couldn't manage it!! We really enjoyed it, a real insider tip, very few tourists!!😀👍🤗”",
      author: 'Wolfgang Vogl',
      image: '../../../assets/temporaryPictures/Zrmanja2.png',
    },
    {
      title: 'CANOE SAFARI',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum obcaecati dignissimos pariatur id recusandae, velitdebitis ab magni odit repudiandae fugiat doloremque porro id, sunt aliquam temporibus in voluptatem dignissimos. Doloribus autem nesciunt ipsum necessitatibus animi pariatur hic saepe maiores accusantium aut. Dolore quisquam dolorum accusantium quos! Voluptates cum, perferendis alias aut enim minima mollitia ea non, vel consequatur debitis ipsam earum provident nesciunt dolorum! Veritatis sequi blanditiis eaque voluptatibus consequuntur ipsam, aliquam culpa! Asperiores id, cupiditate eos nulla nemo obcaecati eligendi iure ullam earum, officia, eius omnis atque? Mollitia enim sapiente sequi perferendis consequuntur accusantium delectus odit laudantium eos et?  sapiente ducimus consequatur.',
      image: '../../../assets/temporaryPictures/Zrmanja3.png',
      author: undefined,
      comment: undefined,
    },
  ];

  constructor(private el: ElementRef) {
    document.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.scrollToSection(event.deltaY);
      },
      { passive: false }
    );
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollTop > 600) {
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

  scrollToStart(): void {
    if (this.currentSectionIndex === 0) {
      return;
    }

    if (this.screenIsMoving === false) {
      this.screenIsMoving = true;

      this.currentSectionIndex = 0;

      this.scrollToElement('page' + this.currentSectionIndex);

      setTimeout(() => {
        this.screenIsMoving = false;
      }, 300);
    }
  }

  scrollToSection(deltaY: number): void {
    if (deltaY >= 0 && this.currentSectionIndex === this.sections.length + 1) {
      return;
    }
    if (deltaY < 0 && this.currentSectionIndex === 0) {
      return;
    }

    if (this.screenIsMoving === false) {
      this.screenIsMoving = true;

      if (deltaY >= 0) {
        this.currentSectionIndex += 1;
      } else {
        this.currentSectionIndex -= 1;
      }

      this.scrollToElement('page' + this.currentSectionIndex);

      setTimeout(() => {
        this.screenIsMoving = false;
      }, 300);
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
