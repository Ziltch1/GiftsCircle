import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} path="/">
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
