import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  CarOutlined,
  ScheduleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const SidebarLayout = () => {
  const location = useLocation();

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={200}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">dHc</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="h-full border-r-0"
        >
          <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
            <Link to="/orders" className="text-gray-600">
              Orders
            </Link>
          </Menu.Item>
          <Menu.Item key="/drivers" icon={<CarOutlined />}>
            <Link to="/drivers" className="text-gray-600">
              Drivers
            </Link>
          </Menu.Item>
          <Menu.Item key="/assign-orders" icon={<ScheduleOutlined />}>
            <Link to="/assign-orders" className="text-gray-600">
              Assign Orders
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <Link to="/profile" className="text-gray-600">
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="/analytics" icon={<BarChartOutlined />}>
            <Link to="/analytics" className="text-gray-600">
              Analytics
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
