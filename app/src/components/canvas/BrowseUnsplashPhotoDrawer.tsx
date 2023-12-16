import React, { useState } from "react";
import { Button, Divider, Drawer, Empty, Input, Skeleton } from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MIDDLE_STYLE } from "@constants/responsive";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import LoadableContainer from "../LoadableContainer";
import SocialIcon from "../SocialIcon";
import { useDrawerStore } from "@stores/useDrawerStore";
import { useCanvasStudioService } from "@core/hooks";

type Props = {
  singleFile?: boolean;
  onLoad: (pics: any[]) => Promise<void>;
};

const BrowseUnsplashPhotoDrawer = ({ singleFile, onLoad }: Props) => {
  const canvasStudioService = useCanvasStudioService();
  const [searchInput, setSearchInput] = useState<string>("");
  const [pics, setPics] = useState<any[]>([]);
  const [selectedPics, setSelectedPics] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { drawerName, closeDrawer } = useDrawerStore();

  const handleOnClose = () => {
    closeDrawer();
  };

  const handleUpload = () => {
    onLoad(pics.filter((pic) => selectedPics[pic.id]));
  };

  const handleSearchPhotos = async () => {
    setLoading(true);
    try {
      const data = await canvasStudioService.getUnsplashPhotos(searchInput);
      setPics(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Drawer
      title={
        <div style={{ ...MIDDLE_STYLE, justifyContent: "space-between" }}>
          <h3>Stock Photos</h3>
          <Button onClick={handleUpload}>
            <UploadOutlined />
            Upload
          </Button>
        </div>
      }
      placement={"bottom"}
      closable={true}
      onClose={handleOnClose}
      height={"90%"}
      getContainer={false}
      open={drawerName === "unsplashPhotoDrawer"}
    >
      <Input
        prefix={<SearchOutlined />}
        suffix={
          <Button
            disabled={!searchInput}
            onClick={handleSearchPhotos}
            type="primary"
          >
            Search Photos
          </Button>
        }
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by keywords. i.e. Restaurants, Gym, Food..."
      />
      <div style={{ ...MIDDLE_STYLE, marginTop: 20 }}>
        <span>
          Powered by <span style={{ fontWeight: "bold" }}>Unsplash</span>{" "}
        </span>
        <SocialIcon platform="unsplash" width={15} style={{ marginLeft: 5 }} />
      </div>
      <Divider />
      <LoadableContainer isLoading={loading} loadComponent={<Skeleton />}>
        <LoadableContainer
          isLoading={pics.length === 0}
          loadComponent={
            <div style={{ ...MIDDLE_STYLE }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No images found</span>}
              />
            </div>
          }
        >
          <div className="card-list">
            {pics.map((pic) => (
              <div
                onClick={() =>
                  setSelectedPics(
                    !singleFile
                      ? {
                          ...selectedPics,
                          [pic.id]: !selectedPics[pic.id],
                        }
                      : {
                          [pic.id]: !selectedPics[pic.id],
                        }
                  )
                }
                className="card"
                key={pic.id}
                style={{
                  borderRadius: 20,
                  padding: selectedPics[pic.id] ? "5px" : "0px",
                  cursor: "pointer",
                  ...(selectedPics[pic.id]
                    ? {
                        border: `6px solid ${GLOBAL_THEME_COLOR.$highlight_color}`,
                      }
                    : {}),
                }}
              >
                <LazyLoadImage
                  loading="lazy"
                  className="card--image"
                  alt={pic.alt_description}
                  src={pic.urls.full}
                  width="50%"
                  height="50%"
                />
              </div>
            ))}
          </div>
        </LoadableContainer>
      </LoadableContainer>
    </Drawer>
  );
};

export default BrowseUnsplashPhotoDrawer;
