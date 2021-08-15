import React, { useContext, useState } from "react";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataContext } from "../../contexts/dataContext";
import { IDataContext, User } from "../../contexts/dataContext/types";
import { OfficesColor } from "./types";
import useModalWindow from "../../hooks/useModalWindow";
import CustomModalWindow from "../Modal";

const CustomTable: React.FC = () => {
  const { users, updateUsers } = useContext(DataContext) as IDataContext;

  const [currentUser, setUser] = useState<User | null>(null);

  const { showModal, isModalVisible, hideModal, mode, setMode } =
    useModalWindow();

  const handleEditUser = (user: User) => {
    setUser(user);
    showModal();
    setMode("edit");
  };

  const handleNewUser = () => {
    showModal();
    setMode("new");
  };

  const handleDeleteUser = (user: User) => {
    updateUsers("delete", user);
  };

  const columns: ColumnsType<User> = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => {
        const [lowA, lowB] = [
          a.first_name.toLocaleLowerCase(),
          b.first_name.toLocaleLowerCase(),
        ];
        if (lowA > lowB) {
          return 1;
        }
        if (lowA < lowB) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => {
        const [lowA, lowB] = [
          a.last_name.toLocaleLowerCase(),
          b.last_name.toLocaleLowerCase(),
        ];
        if (lowA > lowB) {
          return 1;
        }
        if (lowA < lowB) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Office",
      dataIndex: ["office", "name"],
      render: (office: keyof typeof OfficesColor) => (
        <span
          style={{
            color: OfficesColor[office],
            fontWeight: 600,
            padding: "4px",
            border: `1px solid ${OfficesColor[office]}`,
          }}
        >
          {office}
        </span>
      ),
      sorter: (a, b) => {
        const [lowA, lowB] = [
          a.office.name.toLocaleLowerCase(),
          b.office.name.toLocaleLowerCase(),
        ];
        if (lowA > lowB) {
          return 1;
        }
        if (lowA < lowB) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: "Publisher",
      dataIndex: ["publisher", "name"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button onClick={() => handleEditUser(record)} type="primary">
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteUser(record)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <Button onClick={handleNewUser} type="primary">
        Add
      </Button>
      <Table
        pagination={false}
        columns={columns}
        dataSource={users}
        rowKey={(record) => record.id}
      />
      {isModalVisible && (
        <CustomModalWindow
          key={Date.now()}
          user={currentUser}
          mode={mode}
          isModalVisible={isModalVisible}
          hideModal={hideModal}
        />
      )}
    </>
  );
};

export default CustomTable;
