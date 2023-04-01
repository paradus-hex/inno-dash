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
import UserSection from "@/components/UserSection";
import Link from "next/link";

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
      <Box className="mx-auto my-12 max-w-5xl xl:max-w-6xl">
        <Box className="flex flex-col">
          <Box className="flex justify-center md:justify-between ">
            <Link href="/product">
              <Image
                src="/innologo.svg"
                alt="Innoloft logo"
                width={200}
                height={50}
                className="mb-12 self-center md:self-start hover:cursor-pointer"
              />
            </Link>
            {data && (
              <Box
                className="mb-12"
                sx={{
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                <UserSection user={data.user} company={data.company.name} />
              </Box>
            )}
          </Box>
          {data && (
            <Box>
              <ThemeProvider theme={darkTheme}>
                <Box className="flex flex-col md:flex-row items-center md:items-start px-4 md:px-0">
                  <CompanyDescription data={data} />
                  <Offer data={data} />
                </Box>
                <Card className="my-10 mx-4 md:mx-0">
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
              </ThemeProvider>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Product;
