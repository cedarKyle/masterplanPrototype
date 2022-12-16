import { useContext, useMemo } from "react";
import { SdSessionContext } from "./SdSessionContext";
import styles from "./OutputsTable.module.scss";
import { useTable } from 'react-table'
import { formatNumberToSquareFeet, formatNumberToDollars } from "./utils";

const OutputsTable = ({ constructionCost, salePrice, onDataUpdate }) => {
    const { state } = useContext(SdSessionContext);
    const error = state.error;
    const session = state.session;
    
    if (error) {
        return (
            // TODO: Style warning state:
            <div>{error.message}</div>
        );
    } else if (session) {

        const outputs = Object.values(session.outputs);
        const lotData = outputs.find((output) => output.name === "lotData");

        if (lotData) {
            window.console.log('lotData:', lotData);
            // Turn array of values into one object per row, with named key/val pairs per property
            // This is an unlabeled data tree, with a list of values per branch
            const dataArray = lotData.content[0].data;
            const phaseList = dataArray[0].branch; // Currently unused but included in the GH data
            const lotNumberList = dataArray[1].branch;
            const typologyList = dataArray[2].branch;
            const lotAreaList = dataArray[3].branch;
            const gdvList = dataArray[4].branch;

            let formattedLotData = [];

            let sumProfit = 0;
            let sumConstructionCost = 0;
            let sumSalePrice = 0;

            if (phaseList && lotNumberList && typologyList && lotAreaList && gdvList) {
                for (let i = 0; i < phaseList.length; i ++) {
                    const parcelObject = {
                            // "phase": phaseList[i],
                            "lotNumber": `Lot ${lotNumberList[i]}`,
                            "typology": getTypology(typologyList[i]),
                            "lotArea": formatNumberToSquareFeet(lotAreaList[i]),
                            "grossDevelopableArea": formatNumberToSquareFeet(gdvList[i]),
                            "constructionCost": formatNumberToDollars(gdvList[i] * constructionCost),
                            "salePrice": formatNumberToDollars(gdvList[i] * salePrice),
                            "netProfit": formatNumberToDollars((gdvList[i] * salePrice)-(gdvList[i] * constructionCost)),

                    };
                    let profit = (gdvList[i] * salePrice)-(gdvList[i] * constructionCost);
                    sumProfit += profit;

                    sumConstructionCost += (gdvList[i] * constructionCost);
                    sumSalePrice += (gdvList[i] * salePrice);
                    formattedLotData.push(parcelObject);
                }
            }
            onDataUpdate({ sumProfit, sumConstructionCost, sumSalePrice });
            return <BuildOutputTable data={formattedLotData}/>
        }

    } else {
        return <div>Loading Outputs...</div>;
    }
}

function getTypology(value: number) {
    switch(value) {
        case 0:
            return "Single-family";
        default:
            return "N/A";
    }
}


const BuildOutputTable = ({data}) => {
    // build columns by name
    const columns = useMemo(() => 
        [
            {
                Header: "Lot Number",
                accessor: "lotNumber",
            },

            {
                Header: "Typology",
                accessor: "typology",
            },
            {
                Header: "Lot Area",
                accessor: "lotArea",
            },
            {
                Header: "Gross Developable Area",
                accessor: "grossDevelopableArea",
            },
            {
                Header: "Construction Cost",
                accessor: "constructionCost",
            },
            {
                Header: "Sale Price",
                accessor: "salePrice",
            },
            {
                Header: "Net Profit",
                accessor: "netProfit",
            },
        ], []);
      
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    // Render the UI for your table
    return (
        <div className={styles.tableStyles}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr key={`${index}-row`} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th key={`${index}-header`} {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr key={`${index}-row`}{...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td key={`${index}-header`}{...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default OutputsTable;