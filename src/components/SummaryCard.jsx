export default function SummaryCard({title,amount}){

return(

<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition">

<h3 className="text-gray-500 dark:text-gray-300 text-sm">
{title}
</h3>

<p className="text-2xl font-bold text-gray-800 dark:text-white">
₹{amount.toLocaleString()}
</p>

</div>

);

}