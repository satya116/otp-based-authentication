import { Box, Card, CardContent, Typography } from "@mui/material";

import styles from './HeroCompo.module.css'

const HeroCompo = () => {

  return (
    <>
      <Box >
        <Card className={styles.heroCompo} style={{ borderRadius: 11, marginBottom: 111, }}>
          <CardContent style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start" }}>

            <Typography style={{ fontSize: 44, fontWeight: 600, color: "white", marginLeft: 22, marginTop: 22, fontFamily: 'Nunito'  }}>Full year courses taught by top teachers</Typography>

            <img
              src="https://www.vedantu.com/cdn/images/new-home-page/firstfold_ak.webp"
              alt=""
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default HeroCompo;
