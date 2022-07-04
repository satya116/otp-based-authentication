import { Navigate, Outlet, } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoutes = () => {

  const {isAuth} = useSelector((state:any) => state.authSliceReducer )

  return (
    <>
    {
        isAuth ? <Outlet /> : <Navigate to={"/"} replace={true} />
    }
    </>



  );
};

export default ProtectedRoutes;
