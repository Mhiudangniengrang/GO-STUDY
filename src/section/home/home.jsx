import React, { useState } from "react";
import { Image, Calendar, theme, Button, Dropdown, Space } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import gao from "../assets/account/gao.png";
import home from "../assets/account/home.png";
import dayjs from "dayjs";
import { DownOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 350,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const data = {
    labels: ["M", "T", "W", "Th", "F", "S"],
    datasets: [
      {
        label: "Time Active",
        data: [2, 3, 1, 2.5, 3, 1],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const onPanelChange = (value) => {
    setSelectedDate(value.toDate());
  };

  const today = new Date();
  const isToday =
    selectedDate.toDateString() === today.toDateString() ? "0" : "";

  const formatDate = (date) => {
    return dayjs(date).format("Do MMM, YYYY");
  };
  const users = [
    { rank: 1, name: "Daniil Medvedev", hours: "7.800h", icon: "⏲️" },
    { rank: 2, name: "Alexander Zverev", hours: "7.075h", icon: "⏲️" },
    { rank: 3, name: "Novak Djokovic", hours: "6.770h", icon: "⏲️" },
    { rank: 4, name: "Rafael Nadal", hours: "6.525h", icon: "⏲️" },
  ];
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  const activities = [
    { initials: "EK", color: "bg-blue-500" },
    { initials: "JH", color: "bg-purple-500" },
    { initials: "AF", color: "bg-blue-400" },
    { initials: "RP", color: "bg-teal-500" },
    { initials: "JK", color: "bg-red-400" },
  ];
  return (
    <div className="flex flex-col items-center space-y-6 p-6 mb-5">
      <div className="flex justify-between w-full max-w-6xl">
        <div className="flex-col">
          <div className="p-4 flex mx-auto bg-[#BFDDFF] rounded-lg shadow-lg relative space-x-5 h-[15rem]">
            <Image width={240} src={gao} />
            <div className="text-blue-900">
              <h2 className="text-lg">Hi, Nguyen Van An</h2>
              <h1 className="text-4xl font-extrabold">Welcome to Management</h1>
              <p className="mt-2">
                Project activity will be updated here. Click on the name section
                to set your configuration.
              </p>
            </div>
          </div>
          <div className="flex space-x-5">
            <div
              style={wrapperStyle}
              className="mt-5 rounded-lg shadow-lg relative p-5 py-10 h-[18rem]"
            >
              <h3 className="text-xl font-bold mb-2">Time Active</h3>
              <Bar data={data} options={options} />
            </div>
            <div className="bg-gradient-to-t from-[#C8E2FF] to-white p-4 rounded-lg shadow-md text-center w-[13rem] h-[18rem] mt-5">
              <div className="flex justify-center">
                <img src={home} alt="Upgrade Icon" />
              </div>
              <h3 className="font-bold text-lg">
                Upgrade to <span className="text-orange-500">PRO</span> for more
                features.
              </h3>
              <Button
                size="large"
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full"
              >
                Upgrade
              </Button>
            </div>
            {/* Days Card */}
            <div className="flex flex-col">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-5 w-[15rem] h-[5rem] mt-4">
                <span className="text-gray-400 text-2xl">🔥</span>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{isToday}</span>
                  <span className="ml-1">Days</span>
                </div>
                <span className="text-green-500 text-2xl">✔️</span>
              </div>
              {/* Additional Feature Cards */}
              <div className="flex space-x-6 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center w-60 transform rotate-6">
                  <div className="flex justify-center">
                    <img
                      src="https://img.freepik.com/premium-vector/calendar-date-circled-hand-man_165488-4933.jpg"
                      alt="Calendar Icon"
                      className="mb-4 h-20"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Upcoming QBR</h3>
                  <p className="text-blue-600">{formatDate(today)}</p>
                  <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full">
                    Send RSVP
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-5 my-5">
            <div className="w-[22rem]">
              <div className="flex justify-between">
                <h2 className="text-orange-500 font-bold mb-4">Top Ranking</h2>
                <Dropdown menu={{ items, onClick }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="text-[#5F647E]">
                      View
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.rank}
                    className="bg-[#EEE6E2] p-3 rounded-lg flex justify-between items-center shadow-md"
                  >
                    <div className="flex items-center">
                      <span className="font-bold text-lg text-orange-500">
                        #{user.rank}
                      </span>
                      <span className="ml-2 font-bold">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-orange-500">
                      <span>{user.hours}</span>
                      <span>{user.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[29rem]">
              <div className="bg-[#034EA1] text-white p-3 rounded-t-lg flex items-center">
                <EditOutlined className="mr-2" />
              </div>
              <div className="bg-gray-200">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 border-b border-gray-300"
                  >
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Write Text</span>
                    </div>
                    <button className="text-gray-600">-</button>
                  </div>
                ))}
              </div>
              <div className="flex items-center mt-2 text-blue-600 cursor-pointer">
                <PlusOutlined className="mr-2" />
                <span>Add new list</span>
              </div>
            </div>
          </div>
        </div>

        <div style={wrapperStyle} className="h-80 ml-6 flex flex-col">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          <div className="flex justify-end">
            <Button className="bg-[#034EA1] text-white my-3">Attendance</Button>
          </div>
          <div className="">
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">Blog</h2>
              <a href="#" className="text-[#1D7D81] font-bold">
                View All
              </a>
            </div>
            <div className="flex space-x-4">
              <div className="bg-[#F5F5F5] p-5 rounded shadow-md w-60">
                <h3 className="text-lg font-bold">You</h3>
                <div className="flex items-center text-gray-500">
                  <span className="material-icons text-sm mr-1">schedule</span>
                  <span>2:30 PM, Today</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded w-20 h-20">
                <PlusOutlined className="text-gray-500 text-2xl" />
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Activity</h2>
              <a href="#" className="text-teal-600 font-bold">
                View All
              </a>
            </div>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-[#EEE6E2] p-3 rounded flex items-center shadow-md"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${activity.color}`}
                  >
                    {activity.initials}
                  </div>
                  <div className="ml-4">
                    <span className="font-bold">{activity.initials}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
