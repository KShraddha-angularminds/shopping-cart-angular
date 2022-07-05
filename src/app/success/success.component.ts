import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwPaginationComponent } from 'jw-angular-pagination';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  id = '';

  constructor(private route: ActivatedRoute) {}

  clearStorage() {
    localStorage.clear();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => (this.id = res.get('id')!));
  }
}
