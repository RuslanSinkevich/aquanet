import { Layout } from "antd";
import React from "react";
import { Content } from "antd/es/layout/layout";
import Header from "modules/header/Header";

interface ILayoutPage {
  children: React.ReactNode;
}

export default function LayoutPage({ children }: ILayoutPage) {
  return (
    <Layout>
      <Header />
      <Content className="mx-4">{children}</Content>
    </Layout>
  );
}
