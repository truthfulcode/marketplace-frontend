import { Box } from "@mui/material";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { MainButton, styles, SubmitButton } from "./StyledComponents";
const CustomerTabs = () => (
  <>
    <Link href="/listing">
      <MainButton>Listings</MainButton>
    </Link>
    <Link href="/order">
      <MainButton>Orders</MainButton>
    </Link>
    <Link href="/payment">
      <MainButton>Payments</MainButton>
    </Link>
  </>
);
const FreelancerTabs = () => (
  <>
    <Link href="/proposal">
      <MainButton>Proposals</MainButton>
    </Link>
    <Link href="/order">
      <MainButton>Orders</MainButton>
    </Link>
    <Link href="/payment">
      <MainButton>Payments</MainButton>
    </Link>
  </>
);
const LinkTab = ({ dest, title }) => (
  <Link href={dest}>
    <MainButton>{title}</MainButton>
  </Link>
);
function Navbar({accountType = undefined}){
  console.log("acc type", accountType);
  const { data, status } = useSession();
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
      <Box sx={{ flex: 0 }}>
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="FreeWork logo"
            height={48}
            width={164}
          />
        </Link>
      </Box>
      <Box sx={{ ...styles.center, flex: 1 }}>
        {accountType ? (
          accountType === "FREELANCER" ? (
            <FreelancerTabs />
          ) : (
            <CustomerTabs />
          )
        ) : (
          ""
        )}
      </Box>
      <Box>
        {!data ? (
          <Link href="signup">
            <MainButton>Sign Up</MainButton>
          </Link>
        ) : (
          ""
        )}
        {!data ? (
          <Link href="signin">
            <MainButton>Sign In</MainButton>
          </Link>
        ) : (
          ""
        )}
        {!!data ? (
          <SubmitButton
            onClick={async () => {
              await signOut({
                // callbackUrl: router.query.callbackUrl as string,
              });
            }}
          >
            SIGN OUT
          </SubmitButton>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default Navbar;
