import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Image from "next/image";
import { getProduct } from "@/state/slice/product";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Map from "@/components/map";
import "leaflet/dist/leaflet.css";

function extractTextFromHtml(htmlString: string): string {
  // Parse the HTML string into a document object
  const doc = new DOMParser().parseFromString(htmlString, "text/html");

  // Remove all script tags
  const scriptTags = doc.getElementsByTagName("script");
  for (let i = 0; i < scriptTags.length; i++) {
    scriptTags[i].parentNode?.removeChild(scriptTags[i]);
  }

  // Remove all remaining HTML tags and return the text content
  return doc.body.textContent?.trim() || "";
}

const Product = () => {
  const { isLoading, data } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getProduct());
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="mx-auto mt-12 max-w-6xl">
      {data && (
        <div>
          <div className="flex justify-between">
            <ThemeProvider theme={darkTheme}>
              <Card className="w-1/2">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={data?.picture}
                    alt={data?.name}
                    className="h-1/4 p-4"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {data?.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {data?.type.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {extractTextFromHtml(data?.description)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      console.log(data);
                    }}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </ThemeProvider>
            <div className="w-1/3">
              <Map />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium">{data?.type.name}</p>
            <p className="text-lg font-medium">{data?.investmentEffort}</p>
            <p className="text-lg font-medium">{data?.trl.name}</p>
          </div>
          <ul className="list-disc list-inside mb-4">
            {data?.categories.map((category: any) => (
              <li key={category.id} className="text-lg font-medium">
                {category.name}
              </li>
            ))}
          </ul>
          <div className="mb-4">
            <p className="text-lg font-medium"></p>
          </div>
          <div className="mb-4">
            <a
              href={data?.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-500"
            >
              Watch Video
            </a>
          </div>
          <div className="mb-4">
            <p className="text-lg font-medium">Contact Person:</p>
            <p className="text-lg font-medium">{data?.user.firstName}</p>
            <p className="text-lg font-medium">{data?.user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
