import { useEffect, useState } from "react";
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
          });
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
  };
};

export default useDataProvider;
