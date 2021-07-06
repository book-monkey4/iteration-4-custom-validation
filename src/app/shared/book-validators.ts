import { FormControl, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';

export class BookValidators {

  static isbnFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) { return null; }

    const numbers = control.value.replace(/-/g, '');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;

    if (isbnPattern.test(numbers)) {
      return null;
    } else {
      return {
        isbnFormat: { valid: false }
      };
    }
  }

  /** ⚠️ Unterschied zum Buch:
   * Eine Validator-Funktion muss immer ein `AbstractControl` als Argument erhalten.
   * Da wir diesen Validator ausschließlich auf einem `FormArray` einsetzen, können wir hier
   * eine Type Assertion mit `as` nutzen, um den Typ `FormArray` zu garantieren.
   */
  static atLeastOneAuthor(controlArray: AbstractControl): ValidationErrors | null {
    if ((controlArray as FormArray).controls.some(el => el.value)) {
      return null;
    } else {
      return {
        atLeastOneAuthor: { valid: false }
      };
    }
  }

}
