import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Collapse } from "antd";
import {
  FaTiktok,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
const { Panel } = Collapse;
function Room() {
  const [rooms, setRooms] = useState([
    { name: "Ngôn ngữ Anh", online: 0 },
    { name: "Ngôn ngữ Trung", online: 0 },
    { name: "Ngôn ngữ Nhật", online: 0 },
    { name: "Kinh tế và Quản trị", online: 0 },
    { name: "Marketing", online: 180 },
    { name: "Truyền thông và Báo chí", online: 0 },
    { name: "Design", online: 0 },
    { name: "Khoa học kỹ thuật và Công nghệ", online: 0 },
    { name: "Công nghiệp và Xây dựng", online: 0 },
    { name: "Môn đại cương", online: 0 },
  ]);
  const testimonials = [
    {
      text: "Integer id nunc sit semper purus...",
      user: "Brenna Goyette",
      handle: "@brennagoyette",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
      logo: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
    },
    {
      text: "Laborum quis quam. Dolorum et...",
      user: "Leslie Alexander",
      handle: "@lesliealexander",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      text: "Quia dolorem qui et...",
      user: "Michael Foster",
      handle: "@michaelfoster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];
  const navigate = useNavigate();

  const joinRoom = (roomName) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.name === roomName ? { ...room, online: room.online + 1 } : room
      )
    );
    navigate(`/user/room/${roomName}`);
  };

  return (
    <>
      {" "}
      <div className=" text-black min-h-screen p-8 w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">Find your study room now!</h1>
          <p className="text-2xl text-gray-500">
            "Explore, connect, and excel with Go! Study - your pathway to
            success!"{" "}
          </p>
        </div>
        <div className="flex justify-end mb-4">
          <button className="mr-2 bg-gray-700 text-white px-4 py-2 rounded">
            REPORT AN INCIDENT
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded">
            LEAVE FEEDBACK
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{room.name}</h2>
                <div className="flex items-center">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
                  <span>{room.online} online</span>
                </div>
              </div>
              <button
                onClick={() => joinRoom(room.name)}
                className="bg-blue-500 text-white py-2 rounded"
              >
                Join
              </button>
            </div>
          ))}
        </div>
        <div className="mb-8 ">
          <h2 className="text-4xl font-bold mb-4 text-center my-20 ">
            Why join a Go! Study Room?
          </h2>
          <p className="mb-6 w-[60rem] text-center mx-auto text-lg">
            Looking for a place to focus and study with strangers? Try our focus
            rooms. Open 24 hours a day — no matter what timezone or country you
            live in, there will always be a study room for you.
          </p>
          <p className="mb-6 w-[60rem] text-center mx-auto text-lg">
            The perfect place to boost productivity, make new friends and be
            more accountable for your studies. Join and study with the Go! Study
            community today and get one step closer to achieving your goals: get
            better grades, study abroad, work abroad, and land a dream job.
          </p>
        </div>
        <div className="mb-8 flex justify-between mt-[5rem] ">
          <div>
            <h2 className="text-4xl font-bold mb-4 ">About</h2>
            <h2 className="text-4xl font-bold mb-4 ">Go! Study</h2>
            <Button className="bg-white border-black border px-4 py-2 rounded mb-4">
              READ COMMUNITY GUIDELINES
            </Button>
          </div>

          <Collapse className=" text-lg">
            <Panel header="What is Go! Study and what can I do here?" key="1">
              <p>Go! Study is a platform where you can join study rooms...</p>
            </Panel>
            <Panel
              header="Do I need to study a specific subject or go to a specific school?"
              key="2"
            >
              <p>No, you can study any subject you like...</p>
            </Panel>
            <Panel header="How do I join Go! Study?" key="3">
              <p>You can join by signing up on the website...</p>
            </Panel>
            <Panel
              header="Who is behind Go! Study and what is their mission?"
              key="4"
            >
              <p>Go! Study is developed by a team of educators...</p>
            </Panel>
          </Collapse>
        </div>
        <div className="text-center  mt-[5rem]">
          <div className="flex justify-center items-center">
            <h3 className="text-sm font-bold mb-2 bg-gray-300 rounded-md p-2 w-64">
              STUDENTS HELPING STUDENTS
            </h3>
          </div>{" "}
          <h2 className="text-4xl font-bold mb-4">We ❤️ Go! Study...</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <FaTiktok className="text-2xl" />
            <FaInstagram className="text-2xl" />
            <FaFacebook className="text-2xl" />
            <FaTwitter className="text-2xl" />
            <FaLinkedin className="text-2xl" />
            <FaYoutube className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee">
          {testimonials.slice(0, 5).map((testimonial, index) => (
            <Card key={index} className="p-4 mx-5 inline-block">
              <blockquote className="text-gray-700 italic mb-4">
                <p>“{testimonial.text}”</p>
              </blockquote>
              <figcaption className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.user}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold">{testimonial.user}</div>
                  <div className="text-gray-500">{testimonial.handle}</div>
                </div>
                {testimonial.logo && (
                  <img
                    src={testimonial.logo}
                    alt="Logo"
                    className="ml-auto w-16"
                  />
                )}
              </figcaption>
            </Card>
          ))}
        </div>
        <div className="marquee delay my-4">
          {testimonials.slice(5).map((testimonial, index) => (
            <Card key={index} className="p-4 mx-5 inline-block ">
              <blockquote className="text-gray-700 italic mb-4">
                <p>“{testimonial.text}”</p>
              </blockquote>
              <figcaption className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.user}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="font-bold">{testimonial.user}</div>
                  <div className="text-gray-500">{testimonial.handle}</div>
                </div>
                {testimonial.logo && (
                  <img
                    src={testimonial.logo}
                    alt="Logo"
                    className="ml-auto w-16"
                  />
                )}
              </figcaption>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Room;
