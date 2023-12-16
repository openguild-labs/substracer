import React from "react";
import ChartDataEditorModal from "./ChartDataEditorModal";
import DateTimePickerModal from "../DateTimePickerModal";
import ViewLayerTemplateModal from "./ViewLayerTemplateModal";
import AddNewNodeModal from "./AddNewNodeModal";

type Props = {};

const ModaContainer = (props: Props) => {
  return (
    <React.Fragment>
      <ChartDataEditorModal />
      <DateTimePickerModal />
      <ViewLayerTemplateModal />
      <AddNewNodeModal />
    </React.Fragment>
  );
};

export default ModaContainer;
