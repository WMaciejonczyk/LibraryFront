import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RequestBookDetailsDto, RequestBookDto } from './dto/book.dto';
import { RequestRentalDto } from './dto/rental.dto';
import { RequestUserDto } from './dto/user.dto';
import { IdDto } from './dto/id.dto';
import { RequestReviewDto } from './dto/review.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};
export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/login',
        data,
      );

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllBooks(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/book/getAll');

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(
    data: RequestBookDto,
  ): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/book/add', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(data: IdDto): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.delete(`/book/delete/${data.id}`);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllBookDetails(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/book/getAllDetails');

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBookDetails(
    data: RequestBookDetailsDto,
  ): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/book/addDetails', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllRentals(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/rental/getAll');

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addRental(
    data: RequestRentalDto,
  ): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/rental/add', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async endRental(data: IdDto): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post(`/rental/end/${data.id}`);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addUser(
    data: RequestUserDto,
  ): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/user/add', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(data: IdDto): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.delete(`/user/delete/${data.id}`);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllReviews(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/review/getAll');

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addReview(
    data: RequestReviewDto,
  ): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.post('/review/add', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
