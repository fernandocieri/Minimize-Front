import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './assets/styles/compiledStyles.scss';
import Redirection from "./components/redirection/redirection";
import MainView from "./components/mainView/mainView";
import NotFound from "./components/notFound/notFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<MainView />} />
        <Route path="/:customName/:shortUrl" element={<Redirection />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;