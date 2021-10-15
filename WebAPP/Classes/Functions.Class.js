export class Functions{

    static getDecimalPlaces(num) {
        var sep = String(23.32).match(/\D/)[0];
        var b = String(num).split(sep);
      return b[1]? b[1].length : 0;
    }
}