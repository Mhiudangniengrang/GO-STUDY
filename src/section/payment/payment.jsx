import React, { useState, useEffect } from "react";
import { Input, Button, Select, Checkbox, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import vnpay from "../assets/payment/vnpay.png";
import momo from "../assets/payment/momo.png";
import zalo from "../assets/payment/zalopay.png";

function Payment() {
  const location = useLocation();
  const planName = location.state?.planName;
  const price = parseFloat(location.state?.price.replace(".", "")) || 59000;
  const [discountCode, setDiscountCode] = useState("");
  const [total, setTotal] = useState(price);

  useEffect(() => {
    setTotal(price);
  }, [price]);

  const handleApplyDiscount = () => {
    if (discountCode === "BUY1") {
      setTotal(price * 0.9);
    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen bg-white">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-6xl mx-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-6 md:mb-0 md:mr-6">
            <h2 className="text-3xl font-bold mb-4">Let's Make Payment</h2>
            <p className="text-gray-600 mb-8">
              To start your subscription, input your card details to make
              payment. You will be redirected to your bank's authorization page.
            </p>
            <div
              className="p-10 flex flex-col justify-center rounded-lg text-black mb-6 h-full max-h-60"
              style={{
                background: "linear-gradient(#F36F20,#FDC29F, #F0F0F0)",
              }}
            >
              <div className="flex flex-col">
                <h3 className="text-2xl text-[#71717a]">You're paying,</h3>
                <p className="text-4xl font-bold mt-2">
                  {price.toLocaleString()} VND
                </p>
              </div>

              <div className="flex justify-between mt-4 w-full">
                <p className="text-lg">{planName}</p>
                <p className="text-lg">{price.toLocaleString()} VND</p>
              </div>
            </div>
            <Input
              placeholder="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              suffix={<Button onClick={handleApplyDiscount}>Apply</Button>}
              className="mb-4"
            />
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Subtotal: </p>
                <p>{price.toLocaleString()} VND</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Cost: </p>
                <p>0.00 VND</p>
              </div>
              <div className="flex justify-between">
                <p>Discount: </p>
                <p>{discountCode === "BUY1" ? "10%" : "0%"}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Total:</p>
                <p>{total.toLocaleString()} VND</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Typography className="font-bold mb-2">Email</Typography>
            <Input placeholder="Email" className="mb-4" />
            <Typography className="font-bold mb-2">Phone number</Typography>
            <Input placeholder="Phone number" className="mb-4" />
            <div className="flex justify-between mb-4">
              <h4 className="font-bold">Payment method</h4>
              <span className="text-[#034EA1]">
                <PlusOutlined className="mx-2" />
                Add new
              </span>
            </div>
            <div className="flex space-x-4 mb-4">
              <img src={vnpay} alt="VNPay" className="w-16" />
              <img src={momo} alt="MoMo" className="w-16" />
              <img src={zalo} alt="ZaloPay" className="w-16" />
            </div>
            <Typography className="font-bold mb-2">Billing address</Typography>
            <Select className="w-full mb-4">
              <Select.Option value="us">United States</Select.Option>
            </Select>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <Typography className="font-bold mb-2">Zip code</Typography>
                <Input />
              </div>
              <div className="flex-1">
                <Typography className="font-bold mb-2">City</Typography>
                <Input placeholder="City" />
              </div>
            </div>
            <Checkbox className="mb-4">
              Billing address is same as shipping
            </Checkbox>
            <Button type="primary" className="w-full">
              Pay {total.toLocaleString()} VND
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
