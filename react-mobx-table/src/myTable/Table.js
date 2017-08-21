import React, { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import tableState from './TableState'
import './Table.css'

@observer
export default class Table extends Component {
    constructor(props) {
        super(props);

        props.data.entry = {};
        props.data.dataHead.map((item,index) =>{
            props.data.entry[item.key] = '';
        })

        tableState.initData(props.data);
    }

    render() {
        console.log("Table render...")
        return (
            <div className="mytable">
                <DataEdit dataHead={tableState.dataHead} isEdit={tableState.isEdit} entry={tableState.isEditEntry} editConfirm={tableState.editConfirm} editCancel={tableState.editCancel}/>
                <div className ="table">
                    <THead dataHead={tableState.dataHead} sortKey={tableState.sortKey} sort={tableState.sort} sortBy={tableState.sortBy}/>
                    <TBody dataHead={tableState.dataHead} dataList={tableState.dataList} delete={tableState.delete} edit={tableState.edit}/>
                </div>
            </div>
        );
    }
}

/**
 * 新增 or 编辑
 */
@observer
class DataEdit extends Component {
    submit(event){
        event.preventDefault();
        if(this.props.editConfirm().isSuccess){
            alert("ok");
        }else{
            alert("false");
        }

    }

    @action
    changeHandler(event){
        console.log(this.props.entry);
        if(event.target.name !== "id"){
            this.props.entry[event.target.name] = event.target.value;
        }
    }

    render(){
        console.log("DataEdit render...");

        const isEdit = this.props.isEdit;
        console.log(this.props.entry);

        const edit = this.props.dataHead.map((item, index) => {
            return (
                <div className="edit-block" key={index}>
                    <p className="edit-block-label">{item.name}</p>
                    <div className="edit-block-input" ><input name={item.key} type="text" onChange={this.changeHandler.bind(this)} value={this.props.entry[item.key]} disabled={item.key === 'id'}/></div>
                </div>
            );
        });
        return (
            <form className="editTable" onSubmit={this.submit.bind(this)}>
                <div className="edit">
                    {edit}
                </div>
                {isEdit ? (
                    <div className="operate">
                        <input type="submit" className="operate-btn" name="edit" value="保存"/>
                        <input type="button" className="operate-btn" value="取消" onClick={this.props.editCancel}/>
                    </div>
                ):(
                <div className="operate">
                        <input type="submit" className="operate-btn" name="add" value="新增"/>
                    </div>
                )}
            </form>
        );
    }
}


const THead = observer((props) => {
    console.log("THead render...");
    return (
        <div className = "thead">
            <div className = "tr">
                {props.dataHead.map((item, index) => {
                    const active = (item.key == props.sortKey) ? props.sort ? " active asc" : " active desc" : "";
                    return (
                        <p className={"th"+active} key={index} onClick={() => props.sortBy(item.key)}>{item.name}</p>
                    );
                })}
            </div>
        </div>
    );
})

const TBody = observer((props) => {
    console.log("TBody render...");
    return (
        <div className = "tbody">
            {props.dataList.map((entry, index) => {
                return (
                    <div className = "tr" key={entry.id}>
                        {props.dataHead.map((item, index) => {
                            return (
                                <p className="td" key={index}>{entry[item.key]}</p>
                            );
                        })}
                        <Opetare index={index} delete={props.delete} edit={props.edit}/>
                    </div>
                );
            })}
        </div>
    );
})

const Opetare = observer((props) =>{
     return (
        <div className = "td">
            <span className="btn" onClick={() => props.edit(props.index)}>编辑</span>
            <span className="btn" onClick={() => props.delete(props.index)}>删除</span>
        </div>
    );
})