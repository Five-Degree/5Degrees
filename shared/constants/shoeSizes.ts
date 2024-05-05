// const USMenSizes = [
//   4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
//   13, 14, 15, 16, 17, 18, 19, 20,
// ] as const;
// type USMenSize = (typeof USMenSizes)[number];
// export interface ShoeSize {
//   USMen: USMenSize;
//   EU: number;
//   length: number;
// }

// const shoeSizesMap: ShoeSize[] = [
//   {
//     USMen: 4,
//     EU: 36,
//     length: 22,
//   },
//   {
//     USMen: 4.5,
//     EU: 37,
//     length: 22.5,
//   },
//   {
//     USMen: 5,
//     EU: 37.5,
//     length: 23,
//   },
//   {
//     USMen: 5.5,
//     EU: 38,
//     length: 23.5,
//   },
//   {
//     USMen: 6,
//     EU: 38.5,
//     length: 24,
//   },
//   {
//     USMen: 6.5,
//     EU: 39.5,
//     length: 24.5,
//   },
//   {
//     USMen: 7,
//     EU: 40,
//     length: 25,
//   },
//   {
//     USMen: 7.5,
//     EU: 40.5,
//     length: 25.5,
//   },
//   {
//     USMen: 8,
//     EU: 41.5,
//     length: 26,
//   },
//   {
//     USMen: 8.5,
//     EU: 42,
//     length: 26.5,
//   },
//   {
//     USMen: 9,
//     EU: 42.5,
//     length: 27,
//   },
//   {
//     USMen: 9.5,
//     EU: 43,
//     length: 27.5,
//   },
//   {
//     USMen: 10,
//     EU: 44,
//     length: 28,
//   },
//   {
//     USMen: 10.5,
//     EU: 44.5,
//     length: 28.5,
//   },
//   {
//     USMen: 11,
//     EU: 45,
//     length: 29,
//   },
//   {
//     USMen: 11.5,
//     EU: 45.5,
//     length: 29.5,
//   },
//   {
//     USMen: 12,
//     EU: 46.5,
//     length: 30,
//   },
//   {
//     USMen: 12.5,
//     EU: 47,
//     length: 30.5,
//   },
//   {
//     USMen: 13,
//     EU: 47.5,
//     length: 31,
//   },
//   {
//     USMen: 14,
//     EU: 49,
//     length: 32,
//   },
//   {
//     USMen: 15,
//     EU: 50,
//     length: 33,
//   },
//   {
//     USMen: 16,
//     EU: 51,
//     length: 34,
//   },
//   {
//     USMen: 17,
//     EU: 52,
//     length: 35,
//   },
//   {
//     USMen: 18,
//     EU: 53,
//     length: 36,
//   },
//   {
//     USMen: 19,
//     EU: 54,
//     length: 37,
//   },
//   {
//     USMen: 20,
//     EU: 55,
//     length: 38,
//   },
// ];

// export const getUSWomenSize = (size: ShoeSize["USMen"]) =>
//   size < 13 ? size + 1.5 : null;
// export const getUKSize = (size: ShoeSize["USMen"]) => size - 0.5;
// export const getEUSize = (size: ShoeSize["USMen"]) =>
//   shoeSizesMap.find((s) => s.USMen == size)?.EU;
// export const getLengthSize = (size: ShoeSize["USMen"]) =>
//   shoeSizesMap.find((s) => s.USMen == size)?.length;
// export default shoeSizesMap;
export const sizesEU = [
  25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32,
  32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5,
  40, 40.5, 41, 41.5, 42, 42.5, 4351, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47,
  47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5, 52,
] as const;
type SizesEU = (typeof sizesEU)[number];
export interface ShoeSize {
  EU: SizesEU;
}
