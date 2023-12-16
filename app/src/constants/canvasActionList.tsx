import { ComponentChildrenType } from "@core/models";
// import { MdBrandingWatermark } from 'react-icons/md';
import { TbPhoto, TbSphere, TbStack3 } from "react-icons/tb";

export type CanvasActionId =
  | "component-action"
  | "image-action"
  | "annotation-action";

export type CanvasAction = {
  id: CanvasActionId;
  actionName: string;
  icon: ComponentChildrenType;
};

export const CANVAS_ACTIONS: Record<CanvasActionId, CanvasAction> = {
  "component-action": {
    id: "component-action",
    actionName: "Layer",
    icon: <TbStack3 />,
  },
  "image-action": {
    id: "image-action",
    actionName: "Image",
    icon: <TbPhoto />,
  },
  "annotation-action": {
    id: "annotation-action",
    actionName: "Annotation",
    icon: <TbSphere />,
  },
};
