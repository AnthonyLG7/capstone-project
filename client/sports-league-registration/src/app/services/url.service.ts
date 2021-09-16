import { Injectable } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: ActivatedRoute) { }
  
  getUrl(path: string): string[] {
    return path.split('/');
  }
}
