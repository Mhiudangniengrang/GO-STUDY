import { useSearchParams } from "react-router-dom";

function PaymentResult() {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const isSuccess = searchParams.get("success") === "True";
  const isCancelled = searchParams.get("cancelled") === "true";

  return (
    <div>
      <h1>Kết quả thanh toán</h1>

      {isSuccess && (
        <div>
          <p>Thanh toán thành công!</p>
          <p>Mã đơn hàng: {orderCode}</p>
        </div>
      )}

      {isCancelled && (
        <div>
          <p>Giao dịch đã bị hủy.</p>
          <p>Mã đơn hàng: {orderCode}</p>
        </div>
      )}

      {!isSuccess && !isCancelled && (
        <p>Đã xảy ra lỗi trong quá trình thanh toán.</p>
      )}
    </div>
  );
}

export default PaymentResult;
