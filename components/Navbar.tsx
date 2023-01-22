import { AppBar, Typography, Button, Box } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MainButton, SubmitButton } from "./StyledComponents";

const Navbar = ({ signin = false, signup = false, signout = false }) => {
  return (
    <Box
      position="static"
      sx={{
        p: 0,
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Image
          src="/img/logo.png"
          alt="FreeWork logo"
          height={48}
          width={164}
        />
      </Box>
      <Box>
        {signup ? <Link href="signup">
            <MainButton>Sign Up</MainButton>
          </Link> : ""}
        {signin ? <Link href="signin">
            <MainButton>Sign In</MainButton>
          </Link> : ""}
        {signout ? <SubmitButton
            onClick={async () => {
              await signOut({
                // callbackUrl: router.query.callbackUrl as string,
              });
            }}
          >
            SIGN OUT
          </SubmitButton> : ""}
      </Box>
    </Box>
  );
};

export default Navbar;