import { TextField } from "@mui/material";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function YoutubeComponent({
  videoLink,
  isEdit = false,
}: {
  videoLink: string;
  isEdit?: boolean;
}) {
  const videoId = videoLink.split("v=")[1];

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
      {isEdit ? (
        <TextField
          id="outlined-multiline-static"
          label="Youtube URL"
          className="w-[640px]"
          variant="standard"
        />
      ) : (
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      )}
    </div>
  );
}
