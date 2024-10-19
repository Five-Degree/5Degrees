export default function convertUndefinedToNull(obj: any): any {
  if (obj === undefined) {
    return null;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertUndefinedToNull);
  }

  if (obj !== null && typeof obj === "object") {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = convertUndefinedToNull(obj[key]);
      }
    }
    return newObj;
  }

  return obj;
}
