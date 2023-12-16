import React from 'react';
import { CanvasGithubContributionChartConfig, CanvasLayerSettingComponent } from '@core/models';
import DescriptionItem from './DescriptionItem';
import { Input } from 'antd';
import { useLayerConfig } from '@core/index';

const CanvasLayerContributionChartSetting: CanvasLayerSettingComponent = ({ layer }) => {
  const { config } = useLayerConfig<CanvasGithubContributionChartConfig>(layer);
  return (
    <div>
      <DescriptionItem title="Github username" content={<Input value={config.data.login} />} />
    </div>
  );
};

export default CanvasLayerContributionChartSetting;
