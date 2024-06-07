export class RentalDto {
  id!: number;
  rentDate!: number;
  dueDate!: number;
  returnDate!: number;
  bookId!: number;
  userId!: number;
}

export class RequestRentalDto {
  bookId!: number;
  userId!: number;
  dueDate!: string;
}
