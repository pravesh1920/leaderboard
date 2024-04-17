/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Reorder } from "framer-motion";
import LeaderboardEntry from './LeaderboardEntry'

export default function Leaderboard({ currentData }) {
    const [sortedData, setSortedData] = useState()

    useEffect(() => {
        const sortData = () => {
            setSortedData(sortArrayByProperty('score'))
        }
        sortData()
    }, [currentData])

    const sortArrayByProperty = (prop) => {
        return [...currentData].sort((a, b) => b[`${prop}`] - a[`${prop}`])
    }

    return (
    <>
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">Leaderboard</h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div
                        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                    ></div>
                    {sortedData &&
                        <>
                            <Reorder.Group  draggable={false} dragControls={false} dragListener={false} axis='y' values={sortedData}>
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr className={`  flex items-center justify-between border-b-2 border-gray-200 bg-gray-100`}>
                                        
                                            <th
                                                className="px-5 py-3  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                className="px-5 py-3  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Score
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedData.map((row, index) => {
                                            return (
                                                <Reorder.Item
                                                    as='tr'
                                                    key={`${row.displayName}`}
                                                    dragListener={false}
                                                    draggable={false}
                                                    value={row}>
                                                    <LeaderboardEntry
                                                        key={`${row.displayName}`}
                                                        row={row}
                                                        rowIndex={index}
                                                    />
                                                </Reorder.Item>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </Reorder.Group>
                        </>
                    }
                </div>
            </div>
        </div>
    </>
    )
}