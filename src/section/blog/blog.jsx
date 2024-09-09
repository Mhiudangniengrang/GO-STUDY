import React, { useState } from "react";
import { Avatar, Input, Button, Tabs } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  LineChartOutlined,
  InboxOutlined,
  MailOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import YourBlog from "./yourBlog";
import TrendingTab from "./trendingTab";
import Archive from "./archive";

const { TabPane } = Tabs;

function Blog() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("2");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row space-y-5 md:space-x-10 justify-between">
        <div className="w-full max-w-4xl mx-auto p-6">
          <div className="w-full mb-6">
            <h1 className="text-5xl font-bold text-orange-600">
              Hello, <span className="text-blue-600">Sophie Fortune!</span>
            </h1>
            <p className="text-lg text-orange-600">Have a nice day!</p>
          </div>
          <div className="w-full">
            <Input
              placeholder="search"
              prefix={<SearchOutlined />}
              className="mb-4"
            />
            <div className="flex flex-col md:flex-row justify-between mt-3">
              <Tabs
                defaultActiveKey="2"
                onChange={(key) => setActiveTab(key)}
                className="flex-grow"
              >
                <TabPane tab="Trending" key="1">
                  <TrendingTab />
                </TabPane>
                <TabPane tab="Your Blog" key="2">
                  <YourBlog />
                </TabPane>
                <TabPane tab="Archive" key="3">
                  <Archive />
                </TabPane>
              </Tabs>
              <div className="flex space-x-2 mt-4 md:mt-0 ml-0 md:ml-4">
                <Button icon={<PlusOutlined />} />
                <Button icon={<LineChartOutlined />} />
                <Button icon={<InboxOutlined />} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            collapsed ? "w-24" : "w-64"
          } transition-width duration-300 bg-gradient-to-t from-white to-[#D7DDFF] p-4 relative space-y-5`}
        >
          <div onClick={toggleCollapsed} className="absolute top-4 z-10">
            {collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
          </div>
          {!collapsed && (
            <div className="text-center p-4 space-y-4 rounded-lg">
              <Avatar
                size={64}
                src="https://i.pinimg.com/originals/9f/c4/a0/9fc4a0105bbfad34b73b90cdc3b7ff06.jpg"
                className="mx-auto"
              />
              <div>
                <h3 className="text-orange-600">Sophie Fortune</h3>
                <p className="text-gray-500">@sophiefortune</p>
              </div>
              <Button type="primary" className="bg-orange-600 border-none mb-4">
                My Profile
              </Button>
              <div className="flex justify-center gap-4 mb-4">
                <SearchOutlined className="text-xl" />
                <MailOutlined className="text-xl" />
                <ShareAltOutlined className="text-xl" />
              </div>
              <p className="text-orange-600">Ranking</p>
              <div className="flex justify-center gap-2">
                <span className="text-orange-600 text-xl">🏆</span>
                <span className="text-orange-600 text-xl">🏆</span>
                <span className="text-orange-600 text-xl">🏆</span>
                <span className="text-orange-600 text-xl">🏆</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
