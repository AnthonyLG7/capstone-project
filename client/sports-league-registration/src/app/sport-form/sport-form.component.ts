import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.css']
})
export class SportFormComponent implements OnInit {

  sportForm: FormGroup;
  currentSport;
  currentSportId: number;
  formStatus: string;
  constructor(private sportsService: SportsService,private formBuilder: FormBuilder, private _router: ActivatedRoute, private location: Location) {
      
   }

  ngOnInit(): void {
    this._router.params.subscribe((value) => { 
      this.currentSportId = value.id; 
      console.log(this.currentSportId);
      this.formStatus = value.sportFormStatus;
      console.log(this.formStatus);
    });
    this.sportsService.getSportById(this.currentSportId).subscribe((sportsObject) => {this.currentSport = sportsObject;});
    this.sportForm = this.formBuilder.group({
      'GroupId': [this.currentSport?.GroupId, [Validators.required]],
      'GroupName': [this.currentSport?.GroupName, [Validators.required]],
      'SponsorName': [this.currentSport?.SponsorName, [Validators.required]],
      'SponsorPhone': [this.currentSport?.SponsorPhone, [Validators.required]],
      'SponsorEmail': [this.currentSport?.SponsorEmail, [Validators.compose([Validators.required,Validators.email])]]
    })
      
  }

  onSubmit(formValues){
    //call service to add/update sport
    this.sportsService.updateSport(formValues).subscribe((sport) => this.sportsService.getSports())
    console.log(formValues);
    console.log('pressed form');
    this.location.back();
  }
  
  cancelSportForm(): void {
    this.location.back()
  }

}
