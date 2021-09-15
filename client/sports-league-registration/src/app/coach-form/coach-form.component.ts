import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Coach } from '../models/coach';
import { CoachesService } from '../services/coaches.service';

@Component({
  selector: 'app-coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.css']
})
export class CoachFormComponent implements OnInit {

  coachId: number;
  coach: Coach;
  coachForm: FormGroup;
  formStatus: string;

  constructor(private coachService: CoachesService, private router: ActivatedRoute, private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.router.url.subscribe((url) => {
      this.formStatus = url[1].path;
      this.coachId = Number(url[2].path);
    })
    this.coachService.getCoachByTeam(this.coachId).subscribe((coachObject) => {
      this.coach = coachObject;
    })
    this.coachForm = this.formBuilder.group({
      'CoachId': [this.coach?.CoachId, [Validators.required]],
      'OrganizationName': [this.coach?.OrganizationName, [Validators.required]],
      'CoachName': [this.coach?.CoachName, [Validators.required]],
      'CoachPhoneNumber': [this.coach?.CoachPhoneNumber, [Validators.required]]
    })
    
  }

  onSubmit(coach: Coach) {
    this.coachService.updateCoach(coach).subscribe((coach) => {
      this.coachService.getCoaches();
    })
    this.location.back();
  }

  cancelCoachForm() {
    this.location.back();
  }

}
