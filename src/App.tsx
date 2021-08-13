import React from "react";
import { Layout, Menu } from "antd";
import DataProvider from "./contexts/dataContext";
import CustomTable from "./components/Table";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
  <DataProvider>
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "89vh" }}
        >
          <CustomTable />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Alex Design ©Created by Alex
      </Footer>
    </Layout>
  </DataProvider>
);

export default App;
