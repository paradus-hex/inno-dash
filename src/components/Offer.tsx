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
} from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import UserSection from "./UserSection";
import RoomIcon from "@mui/icons-material/Room";

const MapWithNoSSR = dynamic(() => import("./map"), {
  ssr: false,
});

const Offer = ({ data }: { data: ProductType }) => {
  let address;

  if (data) {
    address = `${data.company.address.street} ${data.company.address.house}, ${data.company.address.zipCode} ${data?.company.address.city.name}, 
    ${data?.company.address.country.name}`;
  }

  return (
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
          <UserSection user={data.user} company={data.company.name} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Offer;
