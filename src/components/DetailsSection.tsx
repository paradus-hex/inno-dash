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

const DetailsSection = ({ data }: { data: ProductType }) => {
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {data.businessModels.map((model) => (
                <Chip key={model.id} label={model.name} />
              ))}
            </Stack>
            <Typography
              className="pt-4"
              gutterBottom
              variant="h6"
              component="div"
            >
              Categories
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              {data.categories.map((cat) => (
                <Chip key={cat.id} label={cat.name} />
              ))}
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

export default DetailsSection;
