import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestList from './pages/TestList';
import MemoryTest from './pages/tests/MemoryTest';
import AttentionTest from './pages/tests/AttentionTest';
import FocusTest from './pages/tests/FocusTest';
import ReactionTest from './pages/tests/ReactionTest';
// import ProblemTest from './pages/tests/ProblemTest';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tests" element={<TestList />} />
          <Route path="/test/memory/:testId" element={<MemoryTest />} />
          <Route path="/test/attention/:testId" element={<AttentionTest />} />
          <Route path="/test/focus/:testId" element={<FocusTest />} />
          <Route path="/test/reactionTime/:testId" element={<ReactionTest />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;