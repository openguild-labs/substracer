import React from "react";
import ChartDataEditorModal from "./canvas/ChartDataEditorModal";
import DateTimePickerModal from "./DateTimePickerModal";
import IntegrationActionModal from "./IntegrationActionModal";
import ViewLayerTemplateModal from "./canvas/ViewLayerTemplateModal";

type Props = {};

const ModaContainer = (props: Props) => {
  return (
    <React.Fragment>
      <ChartDataEditorModal />
      <DateTimePickerModal />
      <IntegrationActionModal />
      <ViewLayerTemplateModal />
    </React.Fragment>
  );
};

export default ModaContainer;
