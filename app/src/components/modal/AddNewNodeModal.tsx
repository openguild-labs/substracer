/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { useModalStore } from "@stores/useModalStore";
import { Button, Divider, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { TbAddressBook, TbArrowsRandom } from "react-icons/tb";

type Props = {};

const AddNewNodeModal = (props: Props) => {
  const [name, setName] = useState<string>("");
  const { openedModals, closeModal } = useModalStore();

  const handleAddExistingKeyToNode = () => {};

  const handleGenerateNewKey = () => {};

  return (
    <Modal
      title="Add New Node"
      onOk={() => closeModal("addNewNodeModal")}
      okText={
        <React.Fragment>
          <PlusOutlined /> Add
        </React.Fragment>
      }
      onCancel={() => closeModal("addNewNodeModal")}
      style={{ maxWidth: 800 }}
      open={openedModals["addNewNodeModal"].status}
    >
      <Divider />
      <h4 style={{ marginBottom: 5 }}>Name</h4>
      <p
        style={{
          marginBottom: 10,
          marginTop: 0,
          color: GLOBAL_THEME_COLOR.$dark_text_color,
        }}
      >
        Name alias for the node identity
      </p>
      <Input
        prefix={<UserOutlined />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter node name"
      />
      <h4 style={{ marginBottom: 5 }}>Address</h4>
      <p
        style={{
          marginBottom: 10,
          marginTop: 0,
          color: GLOBAL_THEME_COLOR.$dark_text_color,
        }}
      >
        Address where the node is running
      </p>
      <Input
        prefix={<TbAddressBook />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter node address. E.g. localhost:3000"
      />
      <h4 style={{ marginBottom: 5 }}>Bootnode Address</h4>
      <p
        style={{
          marginBottom: 10,
          marginTop: 0,
          color: GLOBAL_THEME_COLOR.$dark_text_color,
        }}
      >
        Address of the network bootnode
      </p>
      <Input
        prefix={<TbAddressBook />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter bootnode address. E.g. localhost:3000"
      />
      <Space>
        <div>
          <h4 style={{ marginBottom: 5 }}>DNS</h4>
          <Input
            prefix={<></>}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter node DNS"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 5 }}>RPC PORT</h4>
          <Input
            prefix={<></>}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter RPC port"
          />
        </div>
      </Space>
      <h4 style={{ marginBottom: 5 }}>Keystore</h4>
      <Space style={{ justifyContent: "space-evenly" }}>
        <Button onClick={handleAddExistingKeyToNode} type="primary">
          <PlusOutlined />
          Add existing key to node
        </Button>
        <Button onClick={handleGenerateNewKey}>
          <TbArrowsRandom /> Generate new key
        </Button>
      </Space>
      <Divider />
    </Modal>
  );
};

export default AddNewNodeModal;
