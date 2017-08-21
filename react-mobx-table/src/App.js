import React, { Component } from 'react'
import Table from './myTable/Table'

export default (props) => {
    const data = {
        dataHead : [{
            key: 'id',
            name: '序号'
        }, {
            key: 'boardName',
            name: '板块名称'
        }, {
            key: 'type',
            name: '类型'
        }, {
            key: 'image',
            name: '图片文件'
        }, {
            key: 'statue',
            name: '审核'
        }],
        dataList : [{
            id: "f26c2159-a608-4cd1-b345-722386ed5a74",
            boardName: '音乐无限',
            type: '文件',
            image: 'music/',
            statue: 'true',
        }, {
            id: "a6a1b04d-af2b-4aeb-8550-08da0bbdf5ec",
            boardName: '在线电影',
            type: '文件',
            image: 'movie/',
            statue: 'true',
        }, {
            id: "130b652d-567e-463d-bf83-7d4871c7fd0d",
            boardName: '新闻中心',
            type: '文件',
            image: 'TV/',
            statue: 'false',
        }, {
            id: "3e646156-ce49-42cd-ac3c-80f374dfd554",
            boardName: '软件下载',
            type: '文件',
            image: '',
            statue: 'true',
        }]
    }
    return (
        <div>
            <Table data={data}/>
        </div>
    );
}