import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { HeaderComponent } from '../../utils/header/header.component';

@Component({
  selector: 'app-reserve-page',
  templateUrl: './reserve-page.component.html',
  styleUrls: ['./reserve-page.component.sass'],
})
export class ReservePageComponent {
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  reserved: boolean | undefined;
  constructor(
    private accommodationService: AccommodationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.headerComponent?.changeHeaderTheme(true);

    const email = this.route.snapshot.queryParamMap.get('email');
    const id = this.route.snapshot.queryParamMap.get('id');
    const code = this.route.snapshot.queryParamMap.get('code');

    this.accommodationService
      .reserve(email as string, id as string, code as string)
      .subscribe(
        (data) => {
          this.reserved = true;
          console.log('Uspesno rezervisan zahtev');
        },
        (error) => {
          this.reserved = false;
          console.log('Neuspesno rezervisan zahtev');
        }
      );
  }
}
