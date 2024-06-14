export class RequestUserDto {
  username!: string;
  password!: string;
  role!: string;
  email!: string;
  fullName!: string;
}

export class UserUpdateDto {
  id!: number;
  username: string | undefined;
  role: string | undefined;
  email: string | undefined;
  fullName: string | undefined;
}
