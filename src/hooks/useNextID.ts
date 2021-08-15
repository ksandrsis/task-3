import { User } from "../contexts/dataContext/types";

const useNextID = (users: User[]): number =>
  Math.max.apply(
    null,
    users.map(({ id }) => id)
  ) + 1;

export default useNextID;
