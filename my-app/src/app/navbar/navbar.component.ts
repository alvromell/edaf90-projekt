import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(NavbarComponentDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    })
  }
}

@Component({
  selector: 'navbar-component-dialog',
  templateUrl: './navbar.component.dialog.html'
})

export class NavbarComponentDialog {
  constructor(public dialogRef: MatDialogRef<NavbarComponentDialog>) {}

  clickYes(): void {
    console.log('Yes button clicked');
    window.localStorage.clear();
    location.reload();

  }
} 