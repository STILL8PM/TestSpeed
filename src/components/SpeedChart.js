import React, { PureComponent } from "react";
import * as eCharts from "echarts";
import { Button } from 'antd'
export default class SpeedChart extends PureComponent {

    eChartsRef = React.createRef();

    componentDidMount() {
        const myChart = eCharts.init(this.eChartsRef.current);

        let option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: 'Pressure',
                    type: 'gauge',
                    progress: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}'
                    },
                    data: [
                        {
                            value: 50,
                            name: '网速( MB/s )'
                        }
                    ]
                }
            ]
        };

        myChart.setOption(option);
    }

    render() {
        return <div>
            <Button type="primary">开始测速</Button>
            <div ref={this.eChartsRef} style={{
                width: 600,
                height: 400,

            }}></div>

            <div style={{ width: 600, }}>
                <div style={{ display: 'flex', justifyContent: "space-around" }}>

                    <span>上行网速：</span>
                    <span>上行网速：</span>
                </div>
            </div>
        </div>
    }
}
