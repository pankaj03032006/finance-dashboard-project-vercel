export default function Insights({transactions}){

const expenses=transactions.filter(t=>t.type==="expense");

let highest="None";

if(expenses.length>0){

const map={};

expenses.forEach(t=>{
map[t.category]=(map[t.category]||0)+t.amount;
});

highest=Object.keys(map).reduce((a,b)=>map[a]>map[b]?a:b);

}

const income=transactions
.filter(t=>t.type==="income")
.reduce((a,b)=>a+b.amount,0);

const expense=transactions
.filter(t=>t.type==="expense")
.reduce((a,b)=>a+b.amount,0);

return(

<div className="mt-6">

<h2 className="text-xl font-semibold mb-4">
Financial Insights
</h2>

<div className="grid md:grid-cols-3 gap-4">

<div className="bg-pink-200 dark:bg-pink-900 p-4 rounded-xl">
Highest Spending
<br/>
Category: {highest}
</div>

<div className="bg-yellow-200 dark:bg-yellow-900 p-4 rounded-xl">
Monthly Trend
<br/>
Spending calculated
</div>

<div className="bg-green-200 dark:bg-green-900 p-4 rounded-xl">
Observation
<br/>
{income>expense?"Income higher than expenses":"Expenses higher"}
</div>

</div>

</div>

);

}