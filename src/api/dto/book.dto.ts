export class BookDto {
  id!: number;
  isbn!: number;
  title!: string;
  author!: string;
  publisher!: string;
  publishYear!: number;
  availableCopies!: number;
}

export class RequestBookDto {
  isbn!: number;
  title!: string;
  author!: string;
  publisher!: string;
  publishYear!: number;
  availableCopies!: number;
}

export class BookDetailsDto {
  id!: number;
  bookId!: number;
  genre!: string;
  description!: string;
  coverImageURL!: string;
}

export class RequestBookDetailsDto {
  bookId!: number;
  genre!: string;
  description!: string;
  coverImageURL!: string;
}

export class BookUpdateDto {
  id!: number;
  isbn: number | undefined;
  title: string | undefined;
  publisher: string | undefined;
  availableCopies: number | undefined;
}
