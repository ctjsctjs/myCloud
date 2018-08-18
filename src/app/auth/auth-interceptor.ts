import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    
    //Intercept HTTP Request and run following middleware
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();

        //Clone HTTP Request and set header with authorization
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });

        //Run HTTP Request with added header
        return next.handle(authRequest);
    }
}