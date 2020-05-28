import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case, CaseStatus } from '../../interfaces/case';
import { CasesService } from '../../api/cases.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-page-case-single',
  templateUrl: './case-single.component.html',
  styleUrls: ['./case-single.component.scss']
})
export class CaseSingleComponent implements OnInit {

  public case: Case;
  public loading = true;
  public CaseStatus = CaseStatus;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  caseSingle = [];

  constructor(
    private route: ActivatedRoute,
    public casesService: CasesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    let caseId = this.route.snapshot.paramMap.get("id");
    this.casesService.getCase(+caseId)
      .subscribe((data: Case) => {
        this.case = data[0];
        this.loading = false;
      })

  }

  onStatusChange(value: CaseStatus) {
    let caseId = this.case.id;
    this.casesService.changeCaseStatus(caseId, value).subscribe();
  }

  openSnackBar(status) {
    this._snackBar.open('Статус заявки змнінено на:', status, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
