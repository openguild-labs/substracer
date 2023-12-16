import React from "react";
import { MIDDLE_STYLE } from "@constants/responsive";
import { Button } from "antd";
import SocialIcon from "../SocialIcon";
import { useDrawerStore } from "@stores/useDrawerStore";

type Props = {};

const BrowseUnsplashPhotos = (props: Props) => {
  const { openDrawer } = useDrawerStore();
  const handleBrowseUnsplash = () => {
    openDrawer("unsplashPhotoDrawer");
  };
  return (
    <Button onClick={handleBrowseUnsplash} style={{ ...MIDDLE_STYLE }}>
      <SocialIcon platform="unsplash" width={20} />
      <span style={{ marginLeft: 10 }}>Browse Stock Photos</span>
    </Button>
  );
};

export default BrowseUnsplashPhotos;
