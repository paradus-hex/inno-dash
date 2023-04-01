import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Image from "next/image";
import { getProduct } from "@/state/slice/product";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { CompanyDescription } from "@/components/CompanyDescription";
import Offer from "@/components/Offer";

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
              <Box className="flex">
                <ThemeProvider theme={darkTheme}>
                  <CompanyDescription data={data} />
                  <Offer data={data} />
                </ThemeProvider>
              </Box>

              <Box className="mb-4">
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
              </Box>
              <Box className="mb-4">
                <a
                  href={data?.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-500"
                >
                  Watch Video
                </a>
              </Box>
              <Box className="mb-4">
                <p className="text-lg font-medium">Contact Person:</p>
                <p className="text-lg font-medium">{data?.user.firstName}</p>
                <p className="text-lg font-medium">{data?.user.email}</p>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Product;
