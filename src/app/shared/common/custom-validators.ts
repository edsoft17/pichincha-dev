import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators extends Validators{
    static minDate(nameFirstDate: string, nameSecondDate: string): ValidationErrors | null {
        return (group: AbstractControl): ValidationErrors | null => {
            const firstDate = new Date(group.get(nameFirstDate)?.value);
            const secondDate = new Date(group.get(nameSecondDate)?.value);
            firstDate.setDate(firstDate.getDate() + 1);
            secondDate.setDate(secondDate.getDate() + 1);
            secondDate.setFullYear(secondDate.getFullYear() + 1);
            const dataFirstDate = [firstDate.getDate(),firstDate.getMonth() + 1,firstDate.getFullYear()]
            const dataSecondDate = [secondDate.getDate(),secondDate.getMonth() + 1,secondDate.getFullYear()]
            const conditionDate = dataFirstDate[0] === dataSecondDate[0] && 
                dataFirstDate[1] === dataSecondDate[1]
                dataFirstDate[2] + 1 === dataSecondDate[2]

            return (conditionDate) ? null : {minDate: true};
        }
    }

    static greatDateCurrent(control: AbstractControl): ValidationErrors | null {
        const date = new Date(control.value);
        date.setDate(date.getDate() + 1)
        return (date >= new Date()) ? null : {dateCurrent: true};
    }
}