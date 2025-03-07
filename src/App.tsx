import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ArticleList } from "./components";
import { ArticleProvider } from "./context";

const App = () => {
  return (
    <ArticleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ArticleList />} />
        </Routes>
      </Router>
    </ArticleProvider>
  );
};

export default App;
