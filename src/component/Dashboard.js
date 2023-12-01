import React, {useEffect, useState} from 'react';
import data from '../json/data.json';
import './cssDashboard.css';
import SalesChart from "./SalesChart";

const Dashboard = () => {
    const [paymentMethodInfo, setPaymentMethodInfo] = useState([]);
    const [topProductSalesLst, setTopProductSalesLst] = useState([]);
    const [salesDayLst, setSalesDayLst] = useState([]);
    const [customerSalesLst, setCustomerSalesLst] = useState([]);
    const [rateCustomerInfo, setRateCustomerInfo] = useState([]);
    const [customerNewLst, setCustomerNewLst] = useState([]);

    useEffect(() => {
        setPaymentMethodInfo(data.PaymentMethodInfo);
        setTopProductSalesLst(data.TopProductSalesLst);
        setSalesDayLst(data.SalesDayLst);
        setCustomerSalesLst(data.CustomerSalesLst);
        setRateCustomerInfo(data.RateCustomerInfo);
        setCustomerNewLst(data.CustomerNewLst);
    }, []);

    function formatCurrency(amount) {
        // Chuyển đổi số tiền thành chuỗi và loại bỏ các ký tự không phải số
        const numberString = String(amount).replace(/\D/g, '');

        // Định dạng chuỗi số thành dạng x,xxx,xxx
        const formattedString = numberString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        return formattedString;
    };

    return (
        <>
            <div className="container main">
                <div className="body-left">
                    <div>
                        <div>
                            <h4 style={{color: 'dodgerblue'}}>Thống kê</h4>
                        </div>
                        <div className="thongKe">
                            <div className="thongKe-tien">
                                <p className="chuMo">Tiền mặt</p>
                                <p>{formatCurrency(paymentMethodInfo.Cash)}</p>
                            </div>
                            <div className="thongKe-the">
                                <p className="chuMo">Thẻ</p>
                                <p>{formatCurrency(paymentMethodInfo.Card)}</p>
                            </div>
                            <div className="thongKe-ck">
                                <p className="chuMo">Chuyển khoản</p>
                                <p>{formatCurrency(paymentMethodInfo.CK)}</p>
                            </div>
                            <div className="thongKe-VNpay">
                                <p className="chuMo">VNpay</p>
                                <p>{formatCurrency(paymentMethodInfo.VNPay)}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h4>Doanh số bán hàng theo ca</h4>
                        </div>
                        <div className="bieu-do">
                            <SalesChart salesData={salesDayLst}/>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h4>Top 10 khách mua nhiều nhất</h4>
                        </div>
                        <div className="top10-customer">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên KH</th>
                                    <th>SĐT</th>
                                    <th>Số đơn hàng</th>
                                    <th>Tổng tiền (VNĐ)</th>
                                    <th>Tổng điểm</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    customerSalesLst.map((item, index) => (
                                        <tr>
                                            <td className="my-custom-td">{index + 1}</td>
                                            <td className="my-custom-td">{item.CustomerName}</td>
                                            <td className="my-custom-td">{item.CustomerContact}</td>
                                            <td className="my-custom-td">{item.QuantityBill}</td>
                                            <td className="my-custom-td">{item.Amount}</td>
                                            <td className="my-custom-td">{item.Point}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="body-right">
                    <div className="top5-product" style={{marginTop: "10%"}}>
                        <div>
                            <h5>Top 5 sản phẩm doanh số cao</h5>
                        </div>
                        <hr/>
                        <div className="top5-product-detail">
                            {topProductSalesLst && topProductSalesLst.slice(0, 5).map((item, index) => (
                                <div key={index}>
                                    <p>{index + 1}. {item.ProductName}</p>
                                    <p className="font-size-small">
                                        Doanh số: <span
                                        style={{color: "dodgerblue"}}>{formatCurrency(item.Amount)} đ</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="customer-about-employee">
                        <div>
                            <h5>Khách hàng theo nhân viên</h5>
                        </div>
                        <hr/>
                        <div className="customer-about-employee-detail">
                            {customerNewLst && customerNewLst.slice(0, 6).map((item, index) => (
                                <div key={index} className="customer-about-employee-detail-inside">
                                    <div>{index + 1}. {item.EmployeeName}</div>
                                    <div>
                                        <span className="bo-QuantityCusNew">New: {item.QuantityCusNew}</span> {item.QuantityCus}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;