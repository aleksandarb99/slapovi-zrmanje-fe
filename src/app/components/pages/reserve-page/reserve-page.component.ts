import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { CommonService } from 'src/app/services/common.service';

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
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.headerComponent?.changeHeaderTheme(true);

    const email = this.route.snapshot.queryParamMap.get('email');
    const id = this.route.snapshot.queryParamMap.get('id');
    const code = this.route.snapshot.queryParamMap.get('code');

    this.commonService.setLoading(true);

    this.accommodationService
      .reserve(email as string, id as string, code as string)
      .subscribe(
        (data) => {
          this.commonService.setLoading(false);
          this.reserved = true;
          console.log('Uspesno rezervisan zahtev');
        },
        (error) => {
          this.commonService.setLoading(false);
          this.reserved = false;
          console.log('Neuspesno rezervisan zahtev');
        }
      );
  }
}
