import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Chip, Stack, Tabs, Typography } from "@mui/material";
import Product from "@/shared/interfaces/Products";
import ReviewCard from "./ReviewCard";

type TabValues = "Description" | "Reviews" | "Support";
interface TabPanelProps {
  children?: React.ReactNode;
  index: TabValues;
  value: TabValues;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      role="tabpanel"
      hidden={value != index ? true : false}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      paddingInline={3}
      {...other}
      maxHeight={"30vh"}
      sx={{ overflowY: "auto" }}
    >
      {value == index && (
        <Stack pt={2} gap={2}>
          {children}
        </Stack>
      )}
    </Stack>
  );
}

function a11yProps(index: TabValues) {
  return {
    id: `tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    value: index,
  };
}
export default function ProductDetails({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<TabValues>("Description");

  const handleChange = (event: React.SyntheticEvent, newValue: TabValues) => {
    setActiveTab(newValue);
  };
  return (
    <Stack pb={3}>
      <Stack
        alignItems={"center"}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps("Description")} />
          <Tab
            label="Reviews"
            icon={
              product.reviews && (
                <Chip label={product.reviews?.length} variant="outlined" />
              )
            }
            iconPosition="end"
            {...a11yProps("Reviews")}
          />
          <Tab label="Support" {...a11yProps("Support")} />
        </Tabs>
      </Stack>
      <CustomTabPanel value={activeTab} index={"Description"}>
        {product.desc ? (
          <Typography maxWidth={"60ch"}>{product.desc}</Typography>
        ) : (
          <Typography variant="h3" color={"var(--gray)"}>
            No Description
          </Typography>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={"Reviews"}>
        {product.reviews ? (
          product.reviews.map((rev) => (
            <Stack key={rev.id}>
              <ReviewCard review={rev} />
            </Stack>
          ))
        ) : (
          <Typography variant="h3" color={"var(--gray)"}>
            No Reviews
          </Typography>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={"Support"}>
        Item Three
      </CustomTabPanel>
    </Stack>
  );
}
