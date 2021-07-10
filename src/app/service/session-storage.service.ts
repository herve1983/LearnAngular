import {Injectable} from '@angular/core';
import {UserAuth} from "../model/user-auth";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private USER_AUTH_KEY = "USER_AUTH_KEY";

  constructor() {
  }

  clear() {
    sessionStorage.clear();
  }

  saveToken(userAuth: UserAuth) {
    sessionStorage.removeItem(userAuth.token);
    sessionStorage.setItem(this.USER_AUTH_KEY, JSON.stringify(userAuth));
  }

  removeToken() {
    sessionStorage.removeItem(this.USER_AUTH_KEY);
  }

  getToken(): UserAuth {
    return JSON.parse(sessionStorage.getItem(this.USER_AUTH_KEY) || '{}');
  }
}
