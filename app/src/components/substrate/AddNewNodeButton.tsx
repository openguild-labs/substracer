import { PlusOutlined } from "@ant-design/icons";
import { useModalStore } from "@stores/useModalStore";
import { Button } from "antd";
import React from "react";

type Props = {};

const AddNewNodeButton = (props: Props) => {
  const { openModal } = useModalStore();
  const handleAddNewNode = () => {
    openModal("addNewNodeModal");
  };
  return (
    <Button onClick={handleAddNewNode} style={{ width: "100%" }} type="primary">
      <PlusOutlined /> Add new node
    </Button>
  );
};

export default AddNewNodeButton;
