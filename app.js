/**
 * Created by appBakerz - 05 on 07-Jun-17.
 */


class Table extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        //generate table headings.
        const generateHeadings = (arr) => {
            return arr.map((obj, i) => {
                return (
                    <th key={i}>
                        {obj.label}
                        {obj.icon}
                    </th>
                )
            })
        };

        //generate table data.
        const generateTd = (data, tableIndex, rowIndex) => {
            return this.props.tables[tableIndex].config.map((obj, i) => {
                //nested key.
                if(obj.nestedKey){
                    //nested key && customize function.
                    if(obj.customizeData){
                        return (
                            (data.hasOwnProperty([obj.key]) && typeof data[obj.key] === 'object' && !(data[obj.key] instanceof Array)) ?
                                <td key={i}>{obj.customizeData(data[obj.key][obj.nestedKey], data)}</td> :
                                <td key={i}>Not an object</td>
                        )
                    }
                    return(
                        (data.hasOwnProperty([obj.key]) && typeof data[obj.key] === 'object' && !(data[obj.key] instanceof Array)) ?
                            <td key={i}>{data[obj.key][obj.nestedKey]}</td> :
                            <td key={i}>Not an object</td>
                    )
                }
                //customize function.
                else if(obj.customizeData){
                    return (
                        <td key={i}>{obj.customizeData(data[obj.key], data)}</td>
                    )
                }
                return (
                    <td key={i}>{data[obj.key]}</td>
                )
            })
        };

        const generateRows = (index) => {
            return this.props.data.map((obj, i) => {
                return (
                    <tr key={i}>{generateTd(obj, index, i)}</tr>
                )
            })
        };

        return (
            <div className="react-table-container">
                {/*Tables map*/}
                {this.props.tables.map((obj, i) => {
                    return (
                        <table className={obj.cssClass} key={i}>
                            <thead>
                                <tr>
                                    {generateHeadings(obj.config)}
                                </tr>
                            </thead>
                            <tbody>
                                {generateRows(i)}
                            </tbody>
                        </table>
                    )
                })}
            </div>
        )
    }

}

Table.propTypes = {
    //example: [{config: [{key: '', label: '', isSortable: boolean}], isFixed: boolean, cssClass: string}]
    /*Note: In tables props each object generate it's own table according to configuration.
     1)multiple key separate by space,
     2)cannot pass nestedKey and method at a time,
     3)cannot pass multiple keys and nestedKey at a time,
     4)cannot pass empty key with nestedKey or method,
     5)customizeData have two arguments first key data, second full data
     for now.*/

    //tables is an array of objects.
    tables: PropTypes.arrayOf( React.PropTypes.shape({
        config: PropTypes.arrayOf(React.PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            nestedKey: PropTypes.string,
            customizeData: PropTypes.func,  //get two arguments in customizeData function, 1st value, 2nd whole object, and don't forgot to return value.
            //method: PropTypes.string,
            //colSpan: PropTypes.number,
            //forColSpan: PropTypes.bool,
            //isExpire: PropTypes.bool
        })).isRequired,
        //isFixed: React.PropTypes.bool.isRequired,
        cssClass: PropTypes.string
    }) ).isRequired,
    //data array
    data: PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    //handlers object.
    //handlers: PropTypes.shape({
    // sort: PropTypes.func,
    // edit: PropTypes.func,
    // delete: PropTypes.func
    //}).isRequired,
    //sort by
    //sort: PropTypes.shape({
    // sortBy: PropTypes.any,
    //  sortVal: PropTypes.any
    //}).isRequired
};

//Bootstrap App
ReactDOM.render(
    <Table tables={[{
              config: [
                {key: 'name', label: 'NAME', icon: <i className="fa fa-user" aria-hidden="true"></i>, customizeData: (name, obj) => `Mr: ${name}`}
              ]
            },
            {
              config: [
                {key: 'city', nestedKey: 'code', label: 'CITY CODE'},
                {key: 'city', nestedKey: 'name', label: 'CITY NAME', customizeData: (name, obj) => `${name}, Pakistan`}
              ]
            }]}
           data={[{name: 'umair', city: {name: 'karachi', code: 7500}}, {name: 'zubair', city: {name: 'karachi', code: 7809}}]}

        />,
    document.getElementById('app')
);