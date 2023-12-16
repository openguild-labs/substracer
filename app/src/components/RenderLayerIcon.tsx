import React from 'react';
import { CanvasLayerType } from '@core/models/canvas-type';
import { TbArrowBigRight, TbPhoto, TbSection } from 'react-icons/tb';
import {
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { MdEmojiEmotions, MdOutlineCircle, MdOutlineSquare, MdTextFields } from 'react-icons/md';
import SocialIcon from './SocialIcon';

type Props = {
  type: CanvasLayerType;
};

const RenderLayerIcon = ({ type }: Props) => {
  switch (type) {
    case CanvasLayerType.Canvas:
      return <TbSection />;
    case CanvasLayerType.NormalImage:
      return <TbPhoto />;
    case CanvasLayerType.LineChart:
      return <LineChartOutlined />;
    case CanvasLayerType.PieChart:
      return <PieChartOutlined />;
    case CanvasLayerType.BarChart:
      return <BarChartOutlined />;
    case CanvasLayerType.AreaChart:
      return <AreaChartOutlined />;
    case CanvasLayerType.EmojiAnnotation:
      return <MdEmojiEmotions />;
    case CanvasLayerType.TextAnnotation:
      return <MdTextFields />;
    case CanvasLayerType.ArrowAnnotation:
      return <TbArrowBigRight />;
    case CanvasLayerType.SquareAnnotation:
      return <MdOutlineSquare />;
    case CanvasLayerType.CircleAnnotation:
      return <MdOutlineCircle />;
    case CanvasLayerType.GithubContributionChart:
      return <SocialIcon platform="github" style={{ backgroundColor: 'white' }} width={17} />;
    case CanvasLayerType.ProductHuntCard:
      return <SocialIcon platform="producthunt" style={{ backgroundColor: 'white' }} width={17} />;
    default:
      return <QuestionCircleOutlined />;
  }
};

export default RenderLayerIcon;
