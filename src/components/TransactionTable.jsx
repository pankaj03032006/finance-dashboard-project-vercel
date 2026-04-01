import { useState } from "react";

export default function TransactionTable({transactions}){

const [search,setSearch]=useState("");

const filtered=transactions.filter(t=>
t.category.toLowerCase().includes(search.toLowerCase())
);

return(

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">

<div className="flex justify-between mb-4">

<h2 className="text-lg font-semibold dark:text-white">
Transaction History
</h2>

<input
placeholder="Search category..."
className="border p-2 rounded dark:bg-gray-700 dark:text-white"
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<table className="w-full text-sm text-gray-700 dark:text-gray-200">

<thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">

<tr>

<th className="p-2 text-left">Date</th>
<th className="p-2 text-left">Category</th>
<th className="p-2 text-left">Amount</th>
<th className="p-2 text-left">Type</th>

</tr>

</thead>

<tbody>

{filtered.length===0?(
<tr>
<td colSpan="4" className="text-center py-6 text-gray-400">
No transactions found
</td>
</tr>
):(

filtered.map(t=>(

<tr
key={t.id}
className="border-b border-gray-200 dark:border-gray-700">

<td className="p-2">{t.date}</td>

<td className="p-2">{t.category}</td>

<td className="p-2">₹{t.amount}</td>

<td className="p-2">

<span className={t.type==="income"
? "bg-green-200 text-green-800 px-2 py-1 rounded"
: "bg-red-200 text-red-800 px-2 py-1 rounded"}>

{t.type}

</span>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

);

}