
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ImageService {

  constructor(private httpClient: HttpClient) {}


  public postFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post('http://localhost:8081/upload', formData);
  }

  public generate(data: any): Observable<boolean> {
    return this.httpClient.post('http://localhost:8081/generateNewsletter', data);
  }
}