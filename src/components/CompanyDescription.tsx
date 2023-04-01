import { ProductType } from "@/state/slice/product";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

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

export const CompanyDescription = ({ data }: { data: ProductType }) => {
  return (
    <Card className="mr-0 md:mr-8 mb-12 md:mb-0 flex-1 ">
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
  );
};
