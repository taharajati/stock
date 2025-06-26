import React, { createContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import '../stock-market-style.css';

// Import all stock market components
import Nav from "./stock-market/nav/Nav.jsx";
import Screener from "./stock-market/screener/screener.jsx";
import Calculation from "./stock-market/calculation/Calculation.jsx";
import ChartIV from "./stock-market/Chartiv/ChartIV.jsx";
import StrategiesTable from "./stock-market/StrategiesTable/StrategiesTable.jsx";
import StrategyPositionsTable from "./stock-market/StrategiesTable/StrategyPositionsTable.jsx";
import MainPage from "./stock-market/Mainpage/MainPage.jsx";
import FundsTable from "./stock-market/FundsTable/FundsTable.jsx";
import Blog from "./stock-market/Blog/Blog.jsx";
import PostDetail from "./stock-market/Blog/PostDetail.jsx";
import GroupPostDetail from "./stock-market/Blog/GroupPostDetail.jsx";

// Import context (if exists)
import { ReportProvider } from "../context/stock-market-context.jsx";

export const AuthStatusContext = createContext();
export const LogoutContext = createContext();
export const PermissionsContext = createContext();

function StockMarketApp() {
  return (
    <ReportProvider>
      <AuthStatusContext.Provider value={null}>
        <LogoutContext.Provider value={{ setAuthStatus: () => {} }}>
          <div>
            <Nav />
            <Routes>
              <Route path="screener" element={<Screener />} />
              <Route path="ChartIV" element={<ChartIV />} />
              <Route path="Calculation" element={<Calculation />} />
              <Route path="StrategiesTable" element={<StrategiesTable />} />
              <Route path="MainPage" element={<MainPage />} />
              <Route path="FundsTable" element={<FundsTable/>} />
              <Route path="strategies/:url" element={<StrategyPositionsTable />} />
              <Route path="Blog" element={<Blog />} />
              <Route path="post/:uniqueId" element={<PostDetail />} />
              <Route path="group/:groupId" element={<GroupPostDetail />} />
              <Route path="" element={<Navigate to="MainPage" />} />
            </Routes>
          </div>
        </LogoutContext.Provider>
      </AuthStatusContext.Provider>
    </ReportProvider>
  );
}

export default StockMarketApp;
 