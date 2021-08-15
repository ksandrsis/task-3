export interface IDataContext {
  users: User[];
  publishers?: Publisher[];
  offices: Office[];
  updateUsers: (mode: "edit" | "delete" | "new", user: User) => void | null;
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
