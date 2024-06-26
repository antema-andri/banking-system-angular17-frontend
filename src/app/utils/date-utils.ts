export class DateUtil {
    static formatDate(date: Date): string {
        const day = ("0" + date.getDate()).slice(-2); 
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return `${day}-${month}`;
    }
}