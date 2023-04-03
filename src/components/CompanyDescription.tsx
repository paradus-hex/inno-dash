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
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updatedDescription } from "@/state/slice/product";
import { updateProduct } from "@/state/slice/product";
import { ProductType } from "@/types";

function extractTextFromHtml(htmlString: string): string {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  const scriptTags = doc.getElementsByTagName("script");
  for (let i = 0; i < scriptTags.length; i++) {
    scriptTags[i].parentNode?.removeChild(scriptTags[i]);
  }

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
  const { data: productData } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState(
    productData?.description ?? ""
  );
  return (
    <Card className="mr-0 mb-12 md:mb-0 flex-1">
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
              label="Edit Description"
              multiline
              rows={10}
              defaultValue={extractTextFromHtml(data?.description)}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        {isEdit ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(updatedDescription(description));
              dispatch(updateProduct({ description }));
              router.push("/product");
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
    </Card>
  );
};
