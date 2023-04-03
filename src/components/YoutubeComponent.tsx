import {
  CardActionArea,
  TextField,
  Typography,
  Card,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAppDispatch } from "@/hooks";
import { updateProduct, updatedVideoLink } from "@/state/slice/productSlice";
import { useRouter } from "next/router";
import { dark } from "@mui/material/styles/createPalette";
export default function YoutubeComponent({
  videoLink,
  isEdit,
}: {
  videoLink: string;
  isEdit?: boolean;
}) {
  const [link, setLink] = useState(videoLink);
  const dispatch = useAppDispatch();
  const router = useRouter();
  let videoId;
  if (videoLink) {
    videoId = videoLink.split("v=")[1];
  }

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <Box className="pb-12">
      <Card className="my-10 mx-4 md:mx-0">
        <Typography variant="h6" className="pt-2 pl-2">
          Video
        </Typography>
        <CardActionArea
          sx={{
            padding: "24px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isEdit ? (
            <TextField
              id="outlined-multiline-static"
              label="Youtube URL"
              className="w-[640px]"
              variant="standard"
              onChange={(e) => setLink(e.target.value)}
            />
          ) : (
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
          )}
        </CardActionArea>
        {isEdit ? (
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(updatedVideoLink(link));
                dispatch(updateProduct({ video: link }));
                router.push("/product");
              }}
            >
              Save
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Box>
  );
}
