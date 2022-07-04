import { Button } from "@mui/material";

const ClickNow = (props: any) => {
  return (
    <>
      <Button
        style={{
          minWidth: 100,
          borderRadius: 50,
          padding: "0 11px",
          backgroundColor: "#FF693D",
          height: 36,
          textTransform: "capitalize",
        }}
        variant="contained"
      >
        {props.label}
      </Button>
    </>
  );
};

export default ClickNow;
