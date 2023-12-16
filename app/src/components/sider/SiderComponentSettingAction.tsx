import React from "react";
import { useCanvasStore } from "@stores/useCanvasStore";
import LayerListItem from "../canvas/LayerListItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useMount } from "@core/index";
import { reorder } from "@utils/draggable.util";
import LoadableContainer from "../LoadableContainer";
import { Empty } from "antd";
import { MIDDLE_STYLE } from "@constants/responsive";
import { TbTerminal } from "react-icons/tb";
import { AddNewNodeButton } from "@components/substrate";

type Props = {};

const SiderLayerSettingAction = (props: Props) => {
  const { layers, layerIdsInOrder, updateLayerIdsInOrder } = useCanvasStore();
  const { isMounted } = useMount();

  const onDragEnd: OnDragEndResponder = async (result: any) => {
    if (!result.destination) return;
    const items = reorder(
      layerIdsInOrder,
      result.source.index,
      result.destination.index
    );
    updateLayerIdsInOrder(items);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h4>Components</h4>
      <AddNewNodeButton />
      <LoadableContainer
        isLoading={layerIdsInOrder.length === 0}
        loadComponent={
          <div style={{ ...MIDDLE_STYLE }}>
            <Empty
              image={<TbTerminal style={{ fontSize: 50 }} />}
              description={<span>No components found</span>}
            />
          </div>
        }
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {isMounted && (
            <Droppable isDropDisabled={false} droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {layerIdsInOrder.map((layerId, index) => (
                    <Draggable
                      isDragDisabled={false}
                      key={layers[layerId].id}
                      draggableId={layers[layerId].id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={layers[layerId].id}
                          ref={provided.innerRef}
                          style={provided.draggableProps.style}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <LayerListItem layer={layers[layerId]} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          )}
        </DragDropContext>
      </LoadableContainer>
    </div>
  );
};

export default SiderLayerSettingAction;
