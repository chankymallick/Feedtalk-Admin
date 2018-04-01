import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class Utility {

    public APIHost = "http://localhost:8080/";
    public data;
    constructor(public http: HttpClient) {

    }

    public static getAuthData() {
        var dd1 = btoa((Math.floor(Math.random() * 1000000000)).toString());
        var dd2 = btoa((Math.floor(Math.random() * 1000000000)).toString());
        var un = this.getCookie("LoginEmail");
        var pk = this.getCookie("LoginPassword");
        return dd1 + "/" + pk + "/" + dd2 + "/" + un;
    }
    public static setCookie(cname, cvalue, mintute) {
        var d = new Date();
        d.setTime(d.getTime() + (mintute * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    public static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    public httpPost(Link: string, RequestBody: Object): string {
        this.http.post(this.APIHost + Link + Utility.getAuthData(), RequestBody).subscribe(data => {
            return data;
        }, (err: HttpErrorResponse) => {
            return null;

        });
        return "";
    }

    public httpPostRequest(Link: string, RequestBody: Object) {       
         return this.http.post(this.APIHost + Link + Utility.getAuthData(), RequestBody);      
    }
}