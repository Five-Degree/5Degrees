export interface Review {
  id: string;
  name: string;
  image?: string;
  product: string;
  review: string;
  rating: number;
  date: Date | number;
}
type Reviews = Review[];
export default Reviews;
