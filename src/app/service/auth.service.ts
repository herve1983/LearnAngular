import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../model/user-login";
import {UserAuth} from "../model/user-auth";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {SessionStorageService} from "./session-storage.service";
import {Constants} from "../util/Constants";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = `${Constants.BASE_URL}/user/login`;
  private REGISTER_URL = `${Constants.BASE_URL}/user/register`;

  private _userAuth$ = new BehaviorSubject(this.storageService.getToken());
  public readonly userAuthObs$ = this._userAuth$.asObservable();
  public readonly isLoggedIn = this._userAuth$.asObservable()
    .pipe(
      map(userAuth => userAuth === null || userAuth === undefined)
    );

  constructor(private http: HttpClient, private storageService: SessionStorageService) {
  }

  login(userLogin: UserLogin): Observable<UserAuth> {
    return this.http.post<UserAuth>(this.LOGIN_URL, userLogin)
      .pipe(tap(userAuth => this.storageService.saveToken(userAuth)));
  }

  register(user: User) {
    return this.http.post<User>(this.REGISTER_URL, user);
  }
}
