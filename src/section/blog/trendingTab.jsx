import React from "react";
import { Avatar, Card } from "antd";
import { RetweetOutlined } from "@ant-design/icons";

const trendingData = [
  {
    name: "Guillermo Rauch",
    username: "@rauchg",
    image:
      "https://i.pinimg.com/564x/82/9a/bd/829abd4538f0d80b3aaf26c71a3ff3ef.jpg",
    content:
      "Coolest domain. Check Coolest mission. Check Coolest product. Check",
    time: "5:48 PM Sep 15, 2021",
    retweets: 36,
  },
  {
    name: "Farhaj May0on",
    username: "@farhaimayan",
    image:
      "https://i.pinimg.com/564x/d0/00/14/d000142e8aba3fc2a708334a10f372f6.jpg",
    content:
      "As of today I'm officially a @calcom maxi. The product is epic. @peer_rich where can I buy merch??",
    time: "6:31 AM Feb 17, 2022",
    retweets: 3,
  },
  {
    name: "Matt Galligan",
    username: "@mg",
    image:
      "https://i.pinimg.com/originals/87/11/7e/87117e34960dd5b2c5e8587dc170b06e.jpg",
    content:
      "The more tools I use like @logseq @raycastapp and @calcom the more I believe in the power of an extension platform. Being able to tailor a tool to fit my needs is huge. So: can we please do the above for an email app, contacts app?",
    time: "6:31 AM Feb 17, 2022",
    retweets: 3,
  },
  {
    name: "Thomas Paul Mann",
    username: "@thomaspaulmann",
    image:
      "https://i.pinimg.com/originals/d0/ba/41/d0ba41a282e852d05cdc1102bf660ef0.jpg",
    content:
      "Coolest domain. Check Coolest mission. Check Coolest product. Check",
    time: "6:19 AM Sep 7, 2022",
    retweets: 3,
  },
];

function TrendingTab() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {trendingData.map((post, index) => (
        <Card key={index} className="border-orange-300">
          <div className="flex mb-2">
            <Avatar src={post.image} />
            <div className="ml-3">
              <h2 className="font-bold text-orange-600">{post.name}</h2>
              <p className="text-gray-500">{post.username}</p>
            </div>
          </div>
          <p className="text-lg">{post.content}</p>
          <div className="flex justify-between text-sm text-gray-500 mt-3">
            <span>{post.time}</span>
            <div className="flex space-x-4">
              <span>
                {post.retweets} <RetweetOutlined />
              </span>
              <span>❤️</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default TrendingTab;
