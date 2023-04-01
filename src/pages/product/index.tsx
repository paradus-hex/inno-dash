import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Image from "next/image";
import { getProduct } from "@/state/slice/product";
import {
  Box,
  Card,
  ThemeProvider,
  createTheme,
  CardActionArea,
  Typography,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { CompanyDescription } from "@/components/CompanyDescription";
import Offer from "@/components/Offer";
import YoutubeComponent from "@/components/YoutubeComponent";
import DetailsSection from "@/components/DetailsSection";

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
    return <Box className="text-center py-4">Loading...</Box>;
  }

  return (
    <>
      <Box className="mx-auto mt-12 max-w-6xl">
        <Box className="flex flex-col ">
          <Image
            src="/innologo.svg"
            alt="Innoloft logo"
            width={200}
            height={50}
            className="mb-12"
          />
          {data && (
            <Box>
              <ThemeProvider theme={darkTheme}>
                <Box className="flex">
                  <CompanyDescription data={data} />
                  <Offer data={data} />
                </Box>

                {/* <Box className="mb-4">
                <p className="text-lg font-medium">{data?.type.name}</p>
                <p className="text-lg font-medium">{data?.investmentEffort}</p>
                <p className="text-lg font-medium">{data?.trl.name}</p>
                </Box>
                <ul className="list-disc list-inside mb-4">
                {data?.categories.map((category: any) => (
                  <li key={category.id} className="text-lg font-medium">
                  {category.name}
                  </li>
                  ))}
                  </ul>
                  <Box className="mb-4">
                  <p className="text-lg font-medium"></p>
                </Box> */}
                <Card className="my-10">
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
                    <YoutubeComponent videoLink={data.video} />
                  </CardActionArea>
                </Card>
                <DetailsSection data={data} />
                {/* <Box className="mb-4">
                  <p className="text-lg font-medium">Contact Person:</p>
                  <p className="text-lg font-medium">{data?.user.firstName}</p>
                  <p className="text-lg font-medium">{data?.user.email}</p>
                </Box> */}
              </ThemeProvider>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Product;
