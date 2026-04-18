import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';
import { Charity } from '../../models/charity.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-charity-detail',
  templateUrl: './charity-detail.html',
  standalone: true,
  imports: [FormsModule],
})
export class CharityDetailComponent {

  charity?: Charity;
  comments: any[] = [
  { id: 1, user: 'Jane', text: 'Good luck!' },
  { id: 2, user: 'John', text: 'Hope you reach the goal!' }
];

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.charity = this.api.getCharityById(id);
  }
newComment: string = '';

addComment() {
  console.log(this.newComment);
}
}