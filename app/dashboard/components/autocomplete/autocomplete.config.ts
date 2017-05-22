export class AutoCompleteConfig{
    placeholder: string;
    dataSource: string;
    suggestFromCharNumber: number;
    dataKey: string;
    dataValue: string;

    constructor(dataSource, suggestFromCharNumber, placeholder, dataKey, dataValue){
        this.placeholder = placeholder;
        this.dataSource = dataSource;
        this.suggestFromCharNumber = suggestFromCharNumber;
        this.dataKey = dataKey;
        this.dataValue = dataValue;
    }
}