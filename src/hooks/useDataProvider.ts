import { useCallback, useEffect, useState } from "react";
import parse from "../utils";
import {
  IDataContext,
  Office,
  Publisher,
  User,
} from "../contexts/dataContext/types";
import useLocalStorage from "./useLocalStorage";

const useDataProvider = (): IDataContext => {
  const [data, setData] = useLocalStorage<IDataContext | null>("data", null);

  const [users, setUsers] = useState<User[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [publishers, setPublishers] = useState<Publisher[] | undefined>(
    undefined
  );

  const updateUsers = useCallback(
    (mode: "edit" | "delete" | "new", user: User): void | null => {
      if (data) {
        const { users: oldUsers } = data;
        switch (mode) {
          case "delete": {
            return setData({
              ...data,
              users: oldUsers.filter(({ id }) => id !== user.id),
            });
          }
          case "edit": {
            return setData({
              ...data,
              users: oldUsers.map((old) => (old.id !== user.id ? old : user)),
            });
          }
          case "new": {
            return setData({
              ...data,
              users: [...oldUsers, user],
            });
          }
          default: {
            return null;
          }
        }
      }
    },
    [data, setData]
  );

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      setOffices(data.offices);
      setPublishers(data.publishers);
    } else {
      try {
        Promise.all([
          fetch("https://yoc-media.github.io/weather/api/users.json").then(
            (res) => parse<User[]>(res)
          ),
          fetch("https://yoc-media.github.io/weather/api/publishers.json").then(
            (res) => parse<Publisher[]>(res)
          ),
          fetch("https://yoc-media.github.io/weather/api/offices.json").then(
            (res) => parse<Office[]>(res)
          ),
        ]).then(([initialUsers, initialPublishers, initialOffices]) => {
          setData({
            users: initialUsers,
            offices: initialOffices,
            publishers: initialPublishers,
          } as IDataContext);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [data, setData]);

  return {
    users,
    offices,
    publishers,
    updateUsers,
  };
};

export default useDataProvider;
