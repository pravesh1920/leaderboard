// import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const delay = ms => new Promise(res => setTimeout(res, ms));

const LeaderboardEntry = ({ row, rowIndex }) => {
    const [newRow, setNewRow] = useState()
    const [oldRow, setOldRow] = useState()

    useEffect(() => {
        async function setRows() {
            // If there has been a change in score
            if (oldRow && (oldRow.score !== row.score)) {
                setNewRow(row)
                await delay(2100)
                setOldRow(row)
            }
            // If this is the first render
            else {
                setNewRow(row)
                setOldRow(row)
            }
        }
        setRows()
    }, [row])

    const bkgColour = (index) => {
        let css = `flex-shrink-0 w-10 h-10 rounded-3xl `;
        if (index === 0)
            css += `bg-red-500`;
        if (index === 1)
            css += `bg-orange-500`;
        if (index === 2)
            css += `bg-orange-300`;
        if (index > 2)
            css += `bg-blue-500`;

        return css;
    }

    return (
        <>
            {oldRow && newRow &&
                <motion
                className={`flex items-center justify-between border-gray-200 border-b`}
                    animate={{ scale: newRow.score === oldRow.score ? 1 : 1.03 }}>
                    <td className="px-5 py-1.5 bg-white text-sm">
                        <div className="flex">
                            <div className={bkgColour(rowIndex)}>
                                <p className="text-white whitespace-no-wrap px-4 py-2">
                                    {rowIndex + 1}
                                </p>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap py-2">
                                    {row.displayName}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{row.score}</p>
                    </td>
                </motion>
            }
        </>
    )
}

export default LeaderboardEntry