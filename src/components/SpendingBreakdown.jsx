import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#6366F1","#22C55E","#F59E0B","#EF4444"];

export default function SpendingBreakdown({ transactions }) {

  const expenseData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc,t)=>{

      const existing = acc.find(a => a.name === t.category);

      if(existing){
        existing.value += t.amount;
      } else{
        acc.push({name:t.category,value:t.amount});
      }

      return acc;

    },[]);

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-lg font-semibold mb-4">
        Spending Breakdown
      </h2>

      <PieChart width={300} height={250}>
        <Pie
          data={expenseData}
          dataKey="value"
          outerRadius={90}
        >

          {expenseData.map((entry,index)=>(
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>

        <Tooltip/>

      </PieChart>

    </div>

  );
}