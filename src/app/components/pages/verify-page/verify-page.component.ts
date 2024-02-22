import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { HeaderComponent } from '../../utils/header/header.component';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.sass'],
})
export class VerifyPageComponent {
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  verified: boolean | undefined;

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
      .verifyEmail(email as string, id as string, code as string)
      .subscribe(
        (data) => {
          this.verified = true;
          console.log('Uspesno verifikovan mejl');
        },
        (error) => {
          this.verified = false;
          console.log('Neuspesno verifikovan mejl');
        }
      );
  }
}
