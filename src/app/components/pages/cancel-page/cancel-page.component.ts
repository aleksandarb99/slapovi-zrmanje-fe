import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cancel-page',
  templateUrl: './cancel-page.component.html',
  styleUrls: ['./cancel-page.component.sass'],
})
export class CancelPageComponent {
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  canceled: boolean | undefined;
  constructor(
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.headerComponent?.changeHeaderTheme(true);

    const email = this.route.snapshot.queryParamMap.get('email');
    const id = this.route.snapshot.queryParamMap.get('id');
    const code = this.route.snapshot.queryParamMap.get('code');

    this.accommodationService
      .cancel(email as string, id as string, code as string)
      .subscribe(
        (data) => {
          this.canceled = true;
          console.log('Uspesno otkazan zahtev');
        },
        (error) => {
          this.canceled = false;
          console.log('Neuspesno otkazan zahtev');
        }
      );
  }
}
