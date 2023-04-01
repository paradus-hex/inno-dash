import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { User } from "@/state/slice/product";

const UserSection = ({ user, company }: { user: User; company: string }) => {
  return (
    <Stack direction="row" className="my-4 items-center" spacing={2}>
      <Avatar alt="Remy Sharp" src={user.profilePicture} />
      <Stack>
        <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography variant="caption">
          {user.position}, {company}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserSection;
