import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accept-page',
  templateUrl: './accept-page.component.html',
  styleUrls: ['./accept-page.component.sass'],
})
export class AcceptPageComponent {
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  accepted: boolean | undefined;
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
      .accept(email as string, id as string, code as string)
      .subscribe(
        (data) => {
          this.accepted = true;
          console.log('Uspesno prihvacen zahtev');
        },
        (error) => {
          this.accepted = false;
          console.log('Neuspesno prihvacen zahtev');
        }
      );
  }
}