import { observable, computed, autorun, action, useStrict } from 'mobx'
import uuid from 'node-uuid';
useStrict(true)

const defaultData = {};

class TableState {
    // 数据
    @observable dataHead;
    @observable dataList;
    // 数据 end

    // 数据操作标识
    @observable sortKey = "id";
    @observable sort = true; // true:正序 false：倒叙

    @observable isEdit;
    @observable isEditIndex;
    @observable isEditEntry;
    // 数据操作标识 end

    @computed
    get dataLength() {
        return this.dataList.length;
    }

    // 获取数据
    @action
    initData = (data) => {
        console.log("getData...");
        this.dataHead = data.dataHead;
        this.dataList = data.dataList;
        // this.isEditEntry = data.entry;
        this.initEditFlag();
    }

    @action
    sortBy = (key) => {
        console.log(`sort by ${key} ...`);

        if (key === this.sortKey) {
            this.dataList = this.dataList.reverse();
            this.sort = !this.sort;
        } else {
            let newDateList = this.dataList.sort((enrtyA, entryB) => {
                if (enrtyA[key] > entryB[key]) {
                    return 1;
                } else if (enrtyA[key] < entryB[key]) {
                    return -1;
                } else {
                    return 0;
                }
            })
            this.dataList = newDateList;
            this.sortKey = key;
            this.sort = true;
        }
        this.initEditFlag();
    }

    @action
    delete = (index) => {
        console.log("delete");
        this.dataList.splice(index, 1);
        this.initEditFlag();
    }

    @action
    edit = (index) => {
        console.log("edit");
        this.isEdit = true;
        this.isEditIndex = index;
        this.isEditEntry = { ...this.dataList[index] };
    }

    @action
    editConfirm = () => {
        // 表单验证
        let resMessage = {
            isSuccess: true,
            res: []
        };

        this.dataHead.map((item, index) => {
            if (!this.isEditEntry[item.key] && item.key !== 'id') {
                resMessage.isSuccess = false;
                resMessage.res.push(item.key);
            }
        })

        if (resMessage.isSuccess) {
            if (this.isEditIndex == -1) {
                // 新增
                this.isEditEntry.id = uuid.v4();
                this.dataList.push(this.isEditEntry);
            } else {
                // 修改
                this.dataList[this.isEditIndex] = this.isEditEntry;
            }
            this.initEditFlag();
        }
        return resMessage;
    }

    @action
    editCancel = () => {
        this.initEditFlag();
    }

    @action
    initEditFlag() {
        console.log("init edit");

        let obj = {}
        this.dataHead.map((item) => {
            obj[item.key] = '';
        })
        this.isEditEntry = obj;

        this.isEdit = false;
        this.isEditIndex = -1;

        
    }
}

export default new TableState();