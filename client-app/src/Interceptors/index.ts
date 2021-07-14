import { AuthInterceptor } from "./auth-interceptors";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DateFormatInterceptors } from "./date-format-interceptors";

export const interceptorProviders = [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:DateFormatInterceptors, multi:true}
]