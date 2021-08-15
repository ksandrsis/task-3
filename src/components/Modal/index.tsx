import React, { useContext } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { ModalWindow } from "../../hooks/useModalWindow";
import { IDataContext, User } from "../../contexts/dataContext/types";
import useNextID from "../../hooks/useNextID";
import { DataContext } from "../../contexts/dataContext";

const { Option } = Select;

type ModalType = Pick<ModalWindow, "isModalVisible" | "hideModal" | "mode">;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type Fields = {
  "First name": string;
  "Last name": string;
  id: number;
  office: number | undefined;
  publisher: number | undefined;
};

const CustomModalWindow: React.FC<ModalType & { user: User | null }> = ({
  isModalVisible,
  hideModal,
  mode,
  user,
}) => {
  const { updateUsers, publishers, offices, users } = useContext(
    DataContext
  ) as IDataContext;

  const [form] = Form.useForm();
  const nextID = useNextID(users);

  const iValue = {
    id: mode === "new" ? nextID : user?.id,
    "First name": mode === "new" ? "" : user?.first_name,
    "Last name": mode === "new" ? "" : user?.last_name,
    office: mode === "new" ? offices[0].id : user?.office.id,
    publisher: mode === "new" ? null : user?.publisher?.id,
  };

  const onFinish = (values: Fields) => {
    if (JSON.stringify(iValue) === JSON.stringify(values)) return null;
    updateUsers(mode, {
      id: values.id,
      last_name: values["Last name"],
      first_name: values["First name"],
      office: offices.find(({ id }) => id === values.office) || offices[0],
      publisher: publishers?.find(({ id }) => id === values.publisher) || null,
    });
    hideModal();
  };

  return isModalVisible ? (
    <Modal
      visible={isModalVisible}
      title={mode === "new" ? "New Employee" : "Edit Employee"}
      onOk={hideModal}
      onCancel={hideModal}
      footer={[]}
    >
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          initialValue={iValue.id}
          name="id"
          label="ID"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          initialValue={iValue["First name"]}
          name="First name"
          label="First Name"
          rules={[
            { required: true, max: 20, type: "string", whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={iValue["Last name"]}
          name="Last name"
          label="Last Name"
          rules={[
            { required: true, max: 20, type: "string", whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={iValue.office}
          name="office"
          label="Office"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            {offices.map((office) => (
              <Option key={office.id} value={office.id}>
                {office.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={iValue.publisher}
          name="publisher"
          label="Publisher"
          rules={[{ required: false }]}
        >
          <Select placeholder="Select a option it's not required" allowClear>
            {publishers?.map((publisher) => (
              <Option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button key="submit" type="primary" htmlType="submit">
            Save
          </Button>
          <Button key="back" onClick={hideModal}>
            Cancel
          </Button>
          ,
        </Form.Item>
      </Form>
    </Modal>
  ) : null;
};

export default CustomModalWindow;
