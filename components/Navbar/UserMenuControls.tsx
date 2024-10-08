import CustomIconButton from "@/components/Custom/CustomIconButton";
import { useAuth } from "@/contexts/AuthContext";
import { getPortalUrl } from "@/shared/functions/stripe/stripePayment";
import { NavLinks } from "@/shared/interfaces/Links";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UserAvatar from "./UserAvatar";
import UserMenu from "./UserMenu";

export default function UserMenuControls() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [accountOpenAnchor, setAccountOpenAnchor] =
    useState<null | HTMLElement>(null);
  const accountOpen = Boolean(accountOpenAnchor);
  // const paymentsLink = {
  //   name: "Payments",
  //   handler: handleStripePortal,
  //   icon: <ReceiptLongRoundedIcon />,
  //   goto: "/payments",
  // };
  const orderHistoryLink = {
    name: "Your Orders",
    icon: <SpaceDashboardOutlinedIcon />,
    goto: "/dashboard/orders",
    handler: (param: any) => {
      setAccountOpenAnchor(null);
      router.push("/dashboard/orders");
    },
  };
  const logoutLink = {
    name: "Logout",
    handler: handleLogout,
    icon: <LogoutRoundedIcon />,
    goto: "",
  };
  const menuLinks: Array<NavLinks> = [
    // paymentsLink,
    orderHistoryLink,
    logoutLink,
  ];

  function handleAccountClick(event: React.MouseEvent<HTMLElement>) {
    console.log("event.currentTarget.id", event.currentTarget.id);
    setAccountOpenAnchor(event.currentTarget);
  }
  function handleClose() {
    setAccountOpenAnchor(null);
  }
  function handleLogout() {
    logout();
    handleClose();
  }

  async function handleStripePortal() {
    try {
      const portalUrl = await getPortalUrl();
      router.push(portalUrl);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <CustomIconButton
        onClick={handleAccountClick}
        size="small"
        aria-controls={accountOpen ? "Account Settings" : "undefined"}
        aria-haspopup={true}
        aria-expanded={accountOpen ? true : undefined}
        id="userMenu"
      >
        <UserAvatar avatar={user?.photoURL} name={user?.email} />
      </CustomIconButton>
      <UserMenu
        accountOpenAnchor={accountOpenAnchor}
        id="account-menu"
        handleClose={handleClose}
        accountOpen={accountOpen}
        items={menuLinks}
      />
    </>
  );
}
