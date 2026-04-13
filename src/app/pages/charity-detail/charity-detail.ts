import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';
import { Charity } from '../../models/charity.model';

@Component({
  selector: 'app-charity-detail',
  templateUrl: './charity-detail.component.html'
})
export class CharityDetailComponent {

  charity?: Charity;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.charity = this.api.getCharityById(id);
  }
}