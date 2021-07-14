import { PipeTransform, Pipe } from "@angular/core";
import * as moment from "moment";

@Pipe({ name: 'StringDateFormater' })
export class DateFormatPipe implements PipeTransform {

    transform(dateTimeString: string) {
        return moment(dateTimeString).format('MM/DD/YYYY HH:mm:ss');
    }

}