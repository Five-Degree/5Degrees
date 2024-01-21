export default function (date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}
