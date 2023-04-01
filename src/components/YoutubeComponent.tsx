import {
  CardActionArea,
  TextField,
  Typography,
  Card,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function YoutubeComponent({
  videoLink,
}: {
  videoLink?: string;
}) {
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
    <div className="pb-12">
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
          {!videoLink ? (
            <TextField
              id="outlined-multiline-static"
              label="Youtube URL"
              className="w-[640px]"
              variant="standard"
            />
          ) : (
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
          )}
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" color="primary" onClick={() => {}}>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
