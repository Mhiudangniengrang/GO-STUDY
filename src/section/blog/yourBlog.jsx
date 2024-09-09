import React from "react";
import { Avatar, Tabs } from "antd";
import { RetweetOutlined } from "@ant-design/icons";

function YourBlog() {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md bg-white border-orange-300">
      <div className="flex items-center mb-2">
        <Avatar
          size={44}
          src="https://i.pinimg.com/originals/9f/c4/a0/9fc4a0105bbfad34b73b90cdc3b7ff06.jpg"
        />
        <div className="ml-3">
          <h2 className="font-bold text-orange-600">Sophie Fortune</h2>
          <p className="text-gray-500">@sophiefortune</p>
        </div>
      </div>
      <p className="text-lg">Lovely day with my homework</p>
      <div className="flex justify-between text-sm text-gray-500 mt-3">
        <span>5:48 PM Sep 15, 2021</span>
        <div className="flex space-x-4">
          <span>
            36 <RetweetOutlined />
          </span>
          <span>❤️</span>
        </div>
      </div>
    </div>
  );
}
export default YourBlog;
