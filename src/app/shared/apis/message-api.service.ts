import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, mapTo, tap, map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Post } from '../../classes/post'
import { ErrorApiService } from './error-api.service';
//import { User } from 'oidc-client';
@Injectable({
  providedIn: 'root'
})
export class MessageApiService {
  private readonly _baseUrl = 'https://localhost:7180/api/Bot';

  constructor(
    private http: HttpClient,
    private errorApiService: ErrorApiService) {
  }

  setConversationId(conversationId: string) {
    localStorage.setItem("conversationId", conversationId);
  }

  getConversationId(): string {
    return localStorage.getItem("conversationId");
  }

  getConversationState() {
    return JSON.parse(localStorage.getItem("convoExists")) || false;
  }
  setConversationState(val: boolean) {
    localStorage.setItem("convoExists", JSON.stringify(val));
  }

  //Get response from db
  getResponse(message: string, username: string): string {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    const body = {
      username: username,
      conversationId: this.getConversationId(),
      promptFromUser: message
  };
    return "example response from bot";
  }
  //Find most popular products
  mostPopularProducts(): /*Observable<any>*/ string {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    const username = localStorage.getItem("user");
    const body = {
      username: username,
    };
    return "example popular product";
  }

  //Find similar products
  similarProducts(): /*Observable<any>*/ string {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    const username = localStorage.getItem("user");
    const body = {
      username: username,
    };
    return "example similar product";
  }

  //Find associated users products
  associatedProducts():  /*Observable<any>*/ string{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    const username = localStorage.getItem("user");
    const body = {
      username: username,
    };
    return "example associated products";

  }

  // Returns the conversation id
  startConversation(username: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    const params = new HttpParams()
      .set('username', username)

    return this.http.get(this._baseUrl + '/start-conversation', { params: params, headers: headers, responseType: 'text' }).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error)
        this.errorApiService.addError(error);
        return [error];
      })
    );
      
  }

  // Returns the conversation id
  getAllConversations(username: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');

    const params = new HttpParams()
      .set('username', username)

    return this.http.get(this._baseUrl + '/get-all-conversations', { params: params, headers: headers, responseType: 'text' }).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error)
        this.errorApiService.addError(error);
        return [error];
      })
    );

  }

  /* Send user feedback to api/database */
  postFeedbackRating(post: Post): Observable<any> {
    return this.http.post(this._baseUrl + '/sendFeedbackRating', post).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error)
        this.errorApiService.addError(error);
        return [error];
      })
    );;
  }
  /* Send feedback text to api/database */
  postFeedbackText(post: Post): Observable<any> {
    return this.http.post(this._baseUrl + '/sendFeedbackText', post).pipe(
      map((response) => response),
      catchError(error => {
        console.log(error)
        this.errorApiService.addError(error);
        return [error];
      })
    );;
  }
}
