export default function (arr: any[], obj: any, id: string | undefined = "id") {
  return arr && arr.map((t) => (t[id] === obj[id] ? obj : t));
}
