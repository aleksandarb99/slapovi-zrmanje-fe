import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent {

  commonService: CommonService;

  constructor(commonService: CommonService) {
    this.commonService = commonService;
  }
}
