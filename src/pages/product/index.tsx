import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Image from "next/image";
import { getProduct } from "@/state/slice/product";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RoomIcon from "@mui/icons-material/Room";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import UserSection from "@/components/UserSection";

const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
});

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
    return <Box className="text-center py-4">Loading...</Box>;
  }

  let address;

  if (data) {
    address = `${data.company.address.street} ${data.company.address.house}, ${data.company.address.zipCode} ${data?.company.address.city.name}, 
    ${data?.company.address.country.name}`;
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
                  <Card className="mr-8 flex-1">
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
                  <Card className="flex-1 h-fit">
                    <CardActionArea>
                      <MapWithNoSSR company={data.company} />
                      <CardContent>
                        <Typography className="pb-2">Offered By:</Typography>
                        <Image
                          src={data?.company.logo}
                          alt={data?.name}
                          width={150}
                          height={150}
                        />
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                          className="pt-4"
                        >
                          <RoomIcon className="mb-2 mr-2" />
                          {address}
                        </Typography>
                        <UserSection
                          user={data.user}
                          company={data.company.name}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
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
