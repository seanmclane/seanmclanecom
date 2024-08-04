'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from "recharts"

type Props = {
  data: any[],
  xKey: string,
  barKeys: string[],
  width?: number,
  height?: number,
  tooltip?: boolean,
  legend?: boolean,
  colors?: string[],
  grid?: boolean
}

const defaultColors = [
  "#254646",
  "#386a6a",
  "#4b8d8d",
  "#549f9f",
  "#5eb1b1",
  "#6eb8b8",
  "#7ec0c0",
  "#9ed0d0",
  "#aed8d8",
  "#bedfdf",
]

type TooltipProps = {
  active?: boolean,
  payload?: Array<{
    name: string,
    value: number,
    fill: string
  }>,
  label?: string
}

const CustomTooltip = ({active, payload}: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg pl-4 pr-2 py-2 rounded-lg max-w-48 flex flex-col-reverse">
        {payload.map(item => item.value !== 0 ? (
          <div className="mr-2" style={{color: item.fill}}>
            <h4>{item.name}</h4>
            <p>{item.value}</p>
          </div>
        ) : null)}
      </div>
    )
  }
}

export default function MPChart({data, xKey, barKeys, width, height, tooltip, legend, colors, grid}: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={10} minHeight={height || 500} className="max-w-3xl">
      <BarChart
        width={width || 500}
        height={height || 500}
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: -20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={xKey} />
        <YAxis />
        {grid && <CartesianGrid strokeDasharray="2 3 0" vertical={false}/>}
        {tooltip && <Tooltip content={<CustomTooltip />} />}
        {legend && <Legend />}
        {barKeys.map((k,i) => <Bar stackId="1" fill={colors ? colors[i] : defaultColors[i]} dataKey={k} key={k} />)}
      </BarChart>
    </ResponsiveContainer>
    )
}