import React, { useState, useEffect, useRef } from "react";
import * as eCharts from "echarts";
import { Button } from 'antd';
import test from './client';
const SpeedChart = () => {
    const [speedValue, setSpeedValue] = useState(0)
    const eChartsRef = useRef()
    const speedFun = () => {
        setSpeedValue(test() * 8)
    }
    const getSpeedWithAjax = async (url) => {
        try {
            return await new Promise((resolve, reject) => {
                let start = null;
                let end = null;
                start = new Date().getTime();
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        end = new Date().getTime();
                        const size = xhr.getResponseHeader('Content-Length') / 1024;
                        const speed = size * 1000 / (end - start);
                        resolve(speed);
                        console.log(speed);
                    }
                };
                xhr.open('GET', url);
                xhr.send();
            });
        } catch (err) {
            throw err;
        }
    }
    useEffect(() => {

        const myChart = eCharts.init(eChartsRef.current);

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
                            value: speedValue,
                            name: ' Mbps '
                        }
                    ],
                    min: 0,
                    max: 1000,
                }
            ]
        };

        myChart.setOption(option);
    }, [speedValue])




    return <div>
        <Button type="primary" onClick={() => {
            speedFun()
            getSpeedWithAjax('www.baidu.com')
        }}>开始测速</Button>
        <div ref={eChartsRef} style={{
            width: 600,
            height: 400,

        }}></div>
        <div style={{ width: 600, }}>
            <div style={{ display: 'flex', justifyContent: "space-around" }}>

                <span>上行网速：{speedValue}MB/s</span>
                <span>上行网速：{speedValue}MB/s</span>
            </div>
        </div>
    </div>

}
export default SpeedChart 