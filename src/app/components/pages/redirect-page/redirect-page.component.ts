import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { ActivatedRoute } from '@angular/router';
import { TextService } from 'src/app/services/text.service';
import { LanguageLabel } from 'src/app/model/language-label.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.sass'],
})
export class RedirectPageComponent {
  @ViewChild(HeaderComponent, { static: true }) headerComponent:
    | HeaderComponent
    | undefined;

  flag: boolean | undefined;
  type: string | undefined;
  text: LanguageLabel | undefined;
  isMobile = false;
  isBurgerOpened = false;

  constructor(
    private commonService: CommonService,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private textService: TextService
  ) {}

  ngOnInit() {
    this.textService.text.subscribe((data) => (this.text = data));

    this.headerComponent?.changeHeaderTheme(true);

    this.route.data.subscribe((data) => {
      this.type = data['type'];

      this.continueWithInit();
    });
  }

  getText(text: string) {
    if (this.type === 'verify') {
      if (text === 'SUCCESS_TITLE') {
        return this.text!.successTitleVerify;
      } else if (text === 'SUCCESS_CONTENT') {
        return this.text!.successContentVerify;
      } else if (text === 'FAILED_TITLE') {
        return this.text!.failedTitleVerify;
      } else if (text === 'FAILED_CONTENT') {
        return this.text!.failedContentVerify;
      }
    } else if (this.type === 'reject') {
      if (text === 'SUCCESS_TITLE') {
        return this.text!.successTitleReject;
      } else if (text === 'SUCCESS_CONTENT') {
        return this.text!.successContentReject;
      } else if (text === 'FAILED_TITLE') {
        return this.text!.failedTitleReject;
      } else if (text === 'FAILED_CONTENT') {
        return this.text!.failedContentReject;
      }
    } else if (this.type === 'accept') {
      if (text === 'SUCCESS_TITLE') {
        return this.text!.successTitleAccept;
      } else if (text === 'SUCCESS_CONTENT') {
        return this.text!.successContentAccept;
      } else if (text === 'FAILED_TITLE') {
        return this.text!.failedTitleAccept;
      } else if (text === 'FAILED_CONTENT') {
        return this.text!.failedContentAccept;
      }
    } else if (this.type === 'cancel') {
      if (text === 'SUCCESS_TITLE') {
        return this.text!.successTitleCancel;
      } else if (text === 'SUCCESS_CONTENT') {
        return this.text!.successContentCancel;
      } else if (text === 'FAILED_TITLE') {
        return this.text!.failedTitleCancel;
      } else if (text === 'FAILED_CONTENT') {
        return this.text!.failedContentCancel;
      }
    } else if (this.type === 'reserve') {
      if (text === 'SUCCESS_TITLE') {
        return this.text!.successTitleReserve;
      } else if (text === 'SUCCESS_CONTENT') {
        return this.text!.successContentReserve;
      } else if (text === 'FAILED_TITLE') {
        return this.text!.failedTitleReserve;
      } else if (text === 'FAILED_CONTENT') {
        return this.text!.failedContentReserve;
      }
    }
    return '';
  }

  continueWithInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    const id = this.route.snapshot.queryParamMap.get('id');
    const code = this.route.snapshot.queryParamMap.get('code');

    let callback1 = () => {
      this.flag = true;
    };
    let callback2 = () => {
      this.flag = false;
    };

    if (this.type === 'verify') {
      this.accommodationService
        .verifyEmail(email as string, id as string, code as string)
        .subscribe({
          complete: callback1,
          error: callback2,
        });
    } else if (this.type === 'reject') {
      this.accommodationService
        .reject(email as string, id as string, code as string)
        .subscribe({
          complete: callback1,
          error: callback2,
        });
    } else if (this.type === 'accept') {
      this.accommodationService
        .accept(email as string, id as string, code as string)
        .subscribe({
          complete: callback1,
          error: callback2,
        });
    } else if (this.type === 'cancel') {
      this.accommodationService
        .cancel(email as string, id as string, code as string)
        .subscribe({
          complete: callback1,
          error: callback2,
        });
    } else if (this.type === 'reserve') {
      this.accommodationService
        .reserve(email as string, id as string, code as string)
        .subscribe({
          complete: callback1,
          error: callback2,
        });
    }
  }

  onScreenWidth600(isMobile: boolean) {
    this.isMobile = isMobile;
    if (isMobile) {
      // Invoke your specific function here
      this.commonService.removeWheelEvent();
    }
  }

  reset() {
    this.headerComponent?.revertFlags();
    this.commonService.updateComponentVisibility('');
  }

  updateBurgerEvent(burgerEvent: boolean) {
    this.isBurgerOpened = burgerEvent;
  }
}
