import {useState} from "react";
import {PAGE_SIZE} from "../App.jsx";

export default function Table({setDataChart, setPage, data, sortData, total, page}) {
    const [sort, setSort] = useState('id')

    const changeSort = (type) => () => {
        setSort(type)
        setPage(1)
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={changeSort('id')}>id <span className={sort === 'id' ? 'opacity-50 mx-2' : ' mx-2 cursor-pointer'}>↓</span></th>
                    <th onClick={changeSort('netProfit')}>netProfit <span className={sort === 'netProfit' ? 'opacity-50 mx-2' : 'cursor-pointer mx-2'}>↓</span></th>
                    <th>walletAddress</th>
                </tr>
                </thead>

                <tbody>
                {
                    (sort === 'id' ? data : sortData).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((i, index) => (
                        <tr className={'hover:bg-gray-700 cursor-pointer'} onClick={() => setDataChart(i)}>
                            <td>{((page - 1) * PAGE_SIZE) + 1 + index}</td>
                            <td>{i.netProfit}</td>
                            <td>{i.walletAddress}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {/*page*/}
            <div className={'flex justify-center gap-2 items-center p-4 border w-full'}>
                {
                    page > 1 && <>
                        <div onClick={() => setPage(1)} className={` rounded m-2 px-1 ${page > 1 ? 'bg-blue-700 cursor-pointer' : ''}`}>
                            {'1'}
                        </div>
                        ...
                    </>
                }
                <div onClick={() => setPage(p => p > 1 ? p-1 : p)} className={` rounded m-2 px-1 ${page > 1 ? 'bg-blue-700 cursor-pointer' : ''}`}>
                    {'<'}
                </div>
                <span>{page}</span>
                <div onClick={() => setPage(p => p < Math.ceil(total / PAGE_SIZE) ? p+1 : p)} className={` rounded m-2 px-1 ${page > Math.ceil(total / PAGE_SIZE) ? '' : 'bg-blue-700 cursor-pointer'}`}>
                    {'>'}
                </div>
                {
                    page < Math.ceil(total / PAGE_SIZE) && <>
                        ...
                        <div onClick={() => setPage(Math.ceil(total / PAGE_SIZE))} className={` rounded m-2 px-1 ${page < Math.ceil(total / PAGE_SIZE) ? 'bg-blue-700 cursor-pointer' : ''}`}>
                            {Math.ceil(total / PAGE_SIZE)}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}