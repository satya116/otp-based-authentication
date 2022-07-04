import { Button } from '@mui/material';


const ButtonCompo = (props: any) => {
 

  return (
    <>

    <Button onClick = { props.onClick } style={{...props.style, borderRadius: 0, height: 44, textTransform: "capitalize", padding: "0px 42px" , backgroundColor: "var(--primary-theme-color)" }} variant='contained'  > {props.label} </Button>

    </>
  )
}

export default ButtonCompo;