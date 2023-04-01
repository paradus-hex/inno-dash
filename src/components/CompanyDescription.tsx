import { ProductType } from "@/state/slice/product";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

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

export const CompanyDescription = ({
  data,
  isEdit = false,
}: {
  data: ProductType;
  isEdit?: boolean;
}) => {
  const router = useRouter();
  return (
    <Card className="mr-0  mb-12 md:mb-0 flex-1">
      <CardActionArea>
        {!isEdit && (
          <CardMedia
            component="img"
            image={data?.picture}
            alt={data?.name}
            className="h-1/4 p-4"
          />
        )}
        <CardContent>
          {!isEdit && (
            <>
              <Typography gutterBottom variant="h4" component="div">
                {data?.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {data?.type.name}
              </Typography>
            </>
          )}
          {!isEdit ? (
            <Typography variant="body2" color="text.secondary">
              {extractTextFromHtml(data?.description)}
            </Typography>
          ) : (
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={10}
              defaultValue={extractTextFromHtml(data?.description)}
            />
          )}
        </CardContent>
      </CardActionArea>
      <div className="flex-grow-1">
        <CardActions className="justify-end">
          {isEdit ? (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                router.push("/product/edit");
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                router.push("/product/edit");
              }}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </div>
    </Card>
  );
};
