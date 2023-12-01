import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import {format} from "date-fns";

class SalesChart extends React.Component {
    formatYAxisTick = (value) => {
        // Trừ đi 3 số 0 cuối của giá trị
        const amount = value / 1000;
        // Làm tròn giá trị đến 2 chữ số thập phân
        const roundedAmount = Math.round(amount * 100) / 100;
        // Định dạng giá trị thành dạng số với tối đa 2 chữ số thập phân
        const formattedAmount = roundedAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        return formattedAmount;
    };

    formatXAxisTick = (value) => {
        // Chuyển đổi giá trị value thành đối tượng ngày
        const date = new Date(value);
        // Định dạng ngày thành 'dd/MM'
        console.log(format(date, 'dd/MM'))
        return format(date, 'dd/MM');
    };

    formatLegendLabel = (value) => {
        if (value === 'AM') {
            return 'Sáng';
        } else if (value === 'PM') {
            return 'Tối';
        }
        return value;
    };

    render() {
        const { salesData } = this.props;

        // Render biểu đồ
        return (
            <BarChart width={1100} height={300} data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Day" tickFormatter={this.formatXAxisTick}>
                </XAxis>
                <YAxis tickFormatter={this.formatYAxisTick}>
                </YAxis>
                <Tooltip />
                <Legend formatter={this.formatLegendLabel}/>
                <Bar dataKey="AM" fill="blue" />
                <Bar dataKey="PM" fill="green" />
            </BarChart>
        );
    }
}

export default SalesChart;