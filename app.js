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
                    if(obj.modification){
                        return (
                            (data.hasOwnProperty([obj.key]) && typeof data[obj.key] === 'object' && !(data[obj.key] instanceof Array)) ?
                                <td key={i}>{obj.modification(data[obj.key][obj.nestedKey], data, rowIndex)}</td> :
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
                else if(obj.modification){
                    return (
                        <td key={i}>{obj.modification(data[obj.key], data, rowIndex)}</td>
                    )
                }
                //default node.
                return (
                    data.hasOwnProperty([obj.key]) ? <td key={i}>{data[obj.key]}</td> : <td key={i}>Not define</td>
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
    /*Note: In tables props each object generate it's own table according to it's configuration.
     1)key is the name of your object properties,
     2)modification have three arguments first key value, second full data, third rowIndex.
     for now.*/

    //tables is an array of objects.
    tables: PropTypes.arrayOf( React.PropTypes.shape({
        config: PropTypes.arrayOf(React.PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            nestedKey: PropTypes.string,
            modification: PropTypes.func
        })).isRequired,
        cssClass: PropTypes.string
    }) ).isRequired,
    //array of objects.
    data: PropTypes.arrayOf(React.PropTypes.shape({})).isRequired
};

//Bootstrap App
ReactDOM.render(
    <Table tables={
                    [
                        {
                              config: [
                                {
                                    key: 'name',
                                    label: 'NAME',
                                     icon: <i className="fa fa-user" aria-hidden="true"></i>,
                                      modification: (name, obj, index) => `Mr: ${name}`
                                }
                              ]
                        }
                    ]
                  }
           data={
                    [
                        {
                            name: 'Jhon'
                        },
                        {
                            name: 'Sara'
                        },
                        {
                            name: 'Domnic'
                        }
                    ]
                }

        />,
    document.getElementById('app')
);