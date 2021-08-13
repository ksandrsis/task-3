export interface IDataContext {
  users: User[];
  publishers?: Publisher[];
  offices: Office[];
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  office: Office;
  publisher: null | Publisher;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface Office {
  id: number;
  name: string;
}
