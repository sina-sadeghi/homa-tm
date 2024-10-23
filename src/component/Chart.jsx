import {Bar, CartesianGrid, Cell, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";

export default function Chart({dataChart, setDataChart}) {
    console.log(dataChart)

    return (
        <div className={'bg-gray-700 bg-opacity-30 rounded p-2'}>
            <div onClick={() => setDataChart(undefined)} className={'cursor-pointer mb-4 mx-1 text-red-500 text-left'}>{'X close'}</div>
            <ComposedChart width={800} height={600} data={dataChart?.HotTokenHolders} margin={{ top: 5, right: 20, left: 25, bottom: 20 }}>
                <XAxis dataKey="tokenName" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'amount', position: 'insideRight', offset: 20, }} />
                <YAxis yAxisId="right" orientation="right" stroke="#ff7300" label={{ value: 'times', position: 'insideLeft', offset: 20 }}/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />

                <Bar yAxisId="left" name={'Buy Amount (USD)'} dataKey="Buy Amount (USD)" stackId={'stackedBars'} barSize={30} fill="#8884d8" >
                    {dataChart?.HotTokenHolders.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry['Buy Amount (USD)'] > entry['Sell Amount (USD)'] ? '#bb2222' : '#00f851'}
                        />
                    ))}
                </Bar>
                <Bar yAxisId="left" name={'Sell Amount (USD)'} dataKey="Sell Amount (USD)" stackId={'stackedBars'} barSize={30} fill="#82ca9d">
                    {dataChart?.HotTokenHolders.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry['Buy Amount (USD)'] > entry['Sell Amount (USD)'] ? '#dd3333' : '#00c851'}
                        />
                    ))}
                </Bar>

                <Line yAxisId="right" name={'Total buy sell times'} type="monotone" dataKey={(d) => d?.['Num of Buy Times'] + d?.['Num of Sell Times']} stroke="#ff7300" />
            </ComposedChart >
        </div>
    )
}