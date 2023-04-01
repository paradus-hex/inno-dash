import React from "react";
import { ProductType } from "@/state/slice/product";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
const DetailsSection = ({
  data,
  isEdit = true,
}: {
  data: ProductType;
  isEdit?: boolean;
}) => {
  let icon: any;

  const handleDelete = (model: any) => {};
  return (
    <Card className="mx-4 md:mx-0 md:mr-8 md:w-full">
      <CardActionArea>
        <Typography
          gutterBottom
          className="pt-4 pl-4"
          variant="h5"
          component="div"
        >
          Offer Details
        </Typography>
        <CardContent className="flex flex-col md:flex-row md:justify-evenly">
          <Box className="w-full md:w-auto">
            <Typography gutterBottom variant="h6" component="div">
              Business Models
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={1}
              sx={{ flexWrap: "wrap" }}
            >
              {data.businessModels.map((model) =>
                isEdit ? (
                  <Chip
                    key={model.id}
                    label={model.name}
                    deleteIcon={<DeleteIcon />}
                    onDelete={() =>
                      model.name === "React"
                        ? undefined
                        : handleDelete(model.id)
                    }
                  />
                ) : (
                  <Chip key={model.id} label={model.name} />
                )
              )}
            </Stack>
            <Typography
              className="pt-4"
              gutterBottom
              variant="h6"
              component="div"
            >
              Categories
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={1}
              sx={{ flexWrap: "wrap" }}
            >
              {data.categories.map((cat) =>
                isEdit ? (
                  <Chip
                    key={cat.id}
                    deleteIcon={<DeleteIcon />}
                    label={cat.name}
                    onDelete={() =>
                      cat.name === "React" ? undefined : handleDelete(cat.id)
                    }
                  />
                ) : (
                  <Chip key={cat.id} label={cat.name} />
                )
              )}
            </Stack>
          </Box>
          <Box className="w-full md:w-auto">
            <Typography gutterBottom variant="h6" component="div">
              TRL
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Chip label={data.trl.name} />
            </Stack>
            <Typography
              className="pt-4"
              gutterBottom
              variant="h6"
              component="div"
            >
              Costs
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Chip label={data.investmentEffort} />
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            console.log(data);
          }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default DetailsSection;
