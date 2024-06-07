export class ReviewDto {
  id!: number;
  comment!: string;
  rating: string | undefined;
  reviewDate!: number;
  bookId!: number;
  userId!: number;
}

export class RequestReviewDto {
  comment!: string;
  rating!: string;
  bookId!: number;
}
