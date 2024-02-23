import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reject-page',
  templateUrl: './reject-page.component.html',
  styleUrls: ['./reject-page.component.sass'],
})
export class RejectPageComponent {
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  rejected: boolean | undefined;
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
      .reject(email as string, id as string, code as string)
      .subscribe(
        (data) => {
          this.rejected = true;
          console.log('Uspesno odbijen zahtev');
        },
        (error) => {
          this.rejected = false;
          console.log('Neuspesno odbijen zahtev');
        }
      );
  }
}
