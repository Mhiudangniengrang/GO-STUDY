import React, { useState } from "react";
import { Button, Input, Modal } from "antd";

import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
function RoomTask() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([
    "Hoàn thành bài tập lúc 8h",
    "Cố gắng hoàn thành trước 7h tối",
  ]);
  const [currentTask, setCurrentTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const showModal = (task = "", index = null) => {
    setCurrentTask(task);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentTask("");
    setEditIndex(null);
  };

  const handleSave = () => {
    if (!currentTask.trim()) {
      message.warning("Task cannot be empty");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = currentTask;
      setTasks(updatedTasks);
    } else if (tasks.length < 5) {
      setTasks([...tasks, currentTask]);
    }

    handleCancel();
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  return (
    <>
      <div className="bg-slate-200 p-3 rounded-lg mt-5">
        {/* Top Bar with icons */}
        <div className="flex justify-between items-center text-black mb-4">
          <EditOutlined />
          <CloseOutlined />
        </div>

        {/* List Items */}
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <span className="flex-grow">{task}</span>
                <Button
                  shape="circle"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => showModal(task, index)}
                />
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(index)}
                />
              </div>
              <hr className="my-2 border-black" />
            </div>
          ))}
        </div>

        {/* Add New List Button */}
        <div className="flex items-center justify-start text-white mt-4">
          <Button
            type="primary"
            onClick={() => showModal()}
            icon={<PlusOutlined />}
            disabled={tasks.length >= 5}
          >
            Add new list
          </Button>
        </div>

        {/* Modal for creating or editing a task */}
        <Modal
          title={editIndex !== null ? "Edit Task" : "Create New Task"}
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleSave}
        >
          <Input
            placeholder="Task Name"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
        </Modal>
      </div>
    </>
  );
}

export default RoomTask;
