import { useState } from "react";

export default function AddTransactionModal({ addTransaction }) {

const [category,setCategory]=useState("")
const [amount,setAmount]=useState("")
const [type,setType]=useState("expense")

const submit=(e)=>{
e.preventDefault()

addTransaction({
id:Date.now(),
date:new Date().toISOString().slice(0,10),
category,
amount:Number(amount),
type
})

setCategory("")
setAmount("")
}

return(

<form onSubmit={submit} className="bg-white p-6 shadow rounded-xl">

<h2 className="font-bold mb-4">
Add Transaction
</h2>

<input
placeholder="Category"
className="border p-2 w-full mb-3"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<input
placeholder="Amount"
className="border p-2 w-full mb-3"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<select
className="border p-2 w-full mb-3"
onChange={(e)=>setType(e.target.value)}
>

<option value="expense">Expense</option>
<option value="income">Income</option>

</select>

<button className="bg-blue-500 text-white px-4 py-2 rounded">
Add
</button>

</form>

)

}