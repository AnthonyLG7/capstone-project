import { Component, Input, OnInit } from '@angular/core';
import { Sport } from '../models/sport';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  //Added Input for demonstration purposes to show I can use input.
  @Input() sportInput;
  sports: Sport[];
  

  constructor(private sportsService: SportsService) { }

  ngOnInit(): void {
    
  }

}
