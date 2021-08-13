import React, { useContext } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Data } from "./types";
import { DataContext } from "../../contexts/dataContext";
import { IDataContext } from "../../contexts/dataContext/types";

const CustomTable: React.FC = () => {
  const value = useContext(DataContext) as IDataContext;
  console.log(value);

  const columns: ColumnsType<Data> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => {
        const [lowA, lowB] = [
          a.name.toLocaleLowerCase(),
          b.name.toLocaleLowerCase(),
        ];
        if (lowA > lowB) {
          return 1;
        }
        if (lowA < lowB) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default CustomTable;
