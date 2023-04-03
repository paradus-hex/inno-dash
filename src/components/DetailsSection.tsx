import React, { useState } from "react";
import {
  ProductType,
  updatedBModelsAndCategories,
} from "@/state/slice/product";
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
  TextField,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks";

const DetailsSection = ({
  data,
  isEdit = false,
}: {
  data: ProductType;
  isEdit?: boolean;
}) => {
  const [bModelsAndCategories, setBModelsAndCategories] = useState({
    categories: data.categories,
    businessModels: data.businessModels,
  });
  const [newBusinessModel, setNewBusinessModel] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const dispatch = useAppDispatch();

  const handleDelete = (id: number, type: "businessModels" | "categories") => {
    console.log(bModelsAndCategories);
    bModelsAndCategories[type] = bModelsAndCategories[type].filter(
      (ele) => ele.id !== id
    );
    setBModelsAndCategories({
      ...bModelsAndCategories,
      ...bModelsAndCategories[type],
    });
  };
  const handleAdd = (type: "businessModels" | "categories") => {
    const newItem = {
      id: Date.now(),
      name: type === "businessModels" ? newBusinessModel : newCategory,
    };

    setBModelsAndCategories({
      ...bModelsAndCategories,
      [type]: [...bModelsAndCategories[type], newItem],
    });

    type === "businessModels" ? setNewBusinessModel("") : setNewCategory("");
  };

  const router = useRouter();
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
              {bModelsAndCategories.businessModels.map((model) =>
                isEdit ? (
                  <Chip
                    key={model.id}
                    label={model.name}
                    deleteIcon={<DeleteIcon />}
                    onDelete={() => handleDelete(model.id, "businessModels")}
                  />
                ) : (
                  <Chip key={model.id} label={model.name} />
                )
              )}
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={newBusinessModel}
                    onChange={(e) => setNewBusinessModel(e.target.value)}
                    placeholder="Enter"
                    className="border w-24 px-2 py-1 mr-2 bg-transparent"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAdd("businessModels")}
                    disabled={!newBusinessModel}
                  >
                    + ADD
                  </Button>
                </>
              ) : null}
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
              {bModelsAndCategories.categories.map((cat) =>
                isEdit ? (
                  <Chip
                    key={cat.id}
                    deleteIcon={<DeleteIcon />}
                    label={cat.name}
                    onDelete={() => handleDelete(cat.id, "categories")}
                  />
                ) : (
                  <Chip key={cat.id} label={cat.name} />
                )
              )}
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter"
                    className="border w-24 px-2 py-1 mr-2 bg-transparent"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAdd("categories")}
                    disabled={!newCategory}
                  >
                    ADD
                  </Button>
                </>
              ) : null}
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
        {!isEdit ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              router.push("/product/edit");
            }}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(updatedBModelsAndCategories(bModelsAndCategories));
              router.push("/product");
            }}
          >
            Save
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default DetailsSection;
