import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function YoutubeComponent({ videoLink }: { videoLink: string }) {
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
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
    </div>
  );
}
