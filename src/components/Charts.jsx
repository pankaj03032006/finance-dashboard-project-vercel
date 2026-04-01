import {
LineChart,Line,XAxis,YAxis,Tooltip,
CartesianGrid,PieChart,Pie,Cell,ResponsiveContainer
} from "recharts";

const COLORS=["#6366F1","#22C55E","#F59E0B","#EF4444"];

export default function Charts({transactions}){

if(transactions.length===0){
return(
<div className="bg-white p-6 rounded shadow mt-6 text-center">
No data available
</div>
);
}

const lineData = transactions.map(t=>({
date:t.date,
amount:t.amount
}));

const expenseData = transactions
.filter(t=>t.type==="expense")
.reduce((acc,t)=>{
const f=acc.find(i=>i.name===t.category);
if(f)f.value+=t.amount;
else acc.push({name:t.category,value:t.amount});
return acc;
},[]);

return(

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

<div className="bg-white rounded-xl shadow p-6 h-72">
<h2 className="font-semibold mb-4">Balance Trend</h2>
<ResponsiveContainer width="100%" height="90%">
<LineChart data={lineData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="date"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="amount" stroke="#6366F1"/>
</LineChart>
</ResponsiveContainer>
</div>

<div className="bg-white rounded-xl shadow p-6 h-72">
<h2 className="font-semibold mb-4">Spending Breakdown</h2>
<ResponsiveContainer width="100%" height="90%">
<PieChart>
<Pie data={expenseData} dataKey="value" outerRadius={90}>
{expenseData.map((e,i)=>(
<Cell key={i} fill={COLORS[i%COLORS.length]}/>
))}
</Pie>
<Tooltip/>
</PieChart>
</ResponsiveContainer>
</div>

</div>
);
}