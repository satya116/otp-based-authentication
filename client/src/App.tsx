
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import useLoadingWithRefresh from '../src/hooks/useLoadingWithRefresh'

import './App.css';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import AboutPage from './pages/about/AboutPage';
import AllCoursePage from './pages/courses/AllCoursePage';
import HomePage from './pages/homepage/HomePage';
import LandingPage from './pages/landingpage/LandingPage';
import CoursesSearchPage from './pages/search/CoursesSearchPage';


function App() {

  console.log("jkhjgj");
  

  const loading = useLoadingWithRefresh()

  // call refresh endpoint

  return loading ? ( <h1> loading... </h1>  ) : (<Router>
      <Routes>
        <Route path='/' element={<LandingPage />}/>

        <Route element={<ProtectedRoutes />} >

          <Route path='/home' element={<HomePage />}/>
          {/* home Ke child ko safe krna pdega */}
        </Route>
        <Route path='/search' element={<CoursesSearchPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/all-course' element={<AllCoursePage />} />

      </Routes>
    </Router>


  );
}

export default App;
