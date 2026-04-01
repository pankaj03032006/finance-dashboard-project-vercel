import { useState, useEffect } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import RoleSwitcher from "../components/RoleSwitcher";
import Insights from "../components/Insights";
import Charts from "../components/Charts";
import { transactions as initialData } from "../data/transactions";

export default function Dashboard() {

  const [dark, setDark] = useState(false);
  const [role, setRole] = useState("viewer");
  const [typeFilter, setTypeFilter] = useState("all");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Mock API if empty
  useEffect(() => {
    if (transactions.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
          const mock = data.slice(0,5).map((d,i)=>({
            id: i,
            date: "2026-04-01",
            category: "Mock",
            amount: Math.floor(Math.random()*1000),
            type: i%2===0 ? "income":"expense"
          }));
          setTransactions(mock);
        });
    }
  }, []);

  const filteredTransactions = transactions.filter(t => {
    if(typeFilter==="all") return true;
    return t.type===typeFilter;
  });

  const totalIncome = transactions
    .filter(t=>t.type==="income")
    .reduce((a,b)=>a+b.amount,0);

  const totalExpense = transactions
    .filter(t=>t.type==="expense")
    .reduce((a,b)=>a+b.amount,0);

  const balance = totalIncome-totalExpense;

  const addTransaction = () => {
    const newT = {
      id: Date.now(),
      date: "2026-04-01",
      category: "New Item",
      amount: 500,
      type: "expense"
    };
    setTransactions([...transactions,newT]);
  };

  // Export JSON
  const exportJSON = () => {
    const blob = new Blob(
      [JSON.stringify(transactions)],
      {type:"application/json"}
    );
    const url = URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download="transactions.json";
    a.click();
  };

  // Export CSV
  const exportCSV = () => {
    const rows = transactions.map(
      t => `${t.date},${t.category},${t.amount},${t.type}`
    );
    const csv = "Date,Category,Amount,Type\n"+rows.join("\n");
    const blob=new Blob([csv],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download="transactions.csv";
    a.click();
  };

  return (

<div className={dark
? "min-h-screen bg-gray-900 text-white p-6"
: "min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 p-6"
}>

{/* Header */}
<div className="flex flex-wrap justify-between items-center mb-6 gap-3">

<h1 className="text-2xl font-bold">Financial Dashboard</h1>

<div className="flex gap-3 items-center">



<RoleSwitcher role={role} setRole={setRole}/>

</div>
</div>

{/* Summary */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<SummaryCard title="Total Balance" amount={balance}/>
<SummaryCard title="Income" amount={totalIncome}/>
<SummaryCard title="Expenses" amount={totalExpense}/>

</div>

{/* Charts */}
<Charts transactions={transactions}/>

{/* Filters */}
<div className="mt-6 flex gap-4 flex-wrap">

<select

className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition"
onChange={(e)=>setTypeFilter(e.target.value)}
>
<option value="all">All</option>
<option value="income">Income</option>
<option value="expense">Expense</option>
</select>

<button
onClick={exportJSON}
className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition"
>
Export JSON
</button>

<button
onClick={exportCSV}
className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition"
>
Export CSV
</button>

</div>

{/* Insights */}
<Insights transactions={transactions}/>

{/* Admin Button */}
{role==="admin" && (
<button
onClick={addTransaction}
className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition"
>
Add Transaction
</button>
)}

{/* Table */}
<TransactionTable transactions={filteredTransactions}/>

</div>
  );
}