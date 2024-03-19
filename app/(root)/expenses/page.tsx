"use client";

import { Category, Expense } from "@/app/types";
import { ExpenseTable } from "@/components/shared/ExpensesTable";
import { useGetCategories, useGetRecentExpenses } from "@/lib/react-query/queries";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";


const Home = () => {
  const { data: expenses, isPending: isExpensesLoading,isFetchedAfterMount } = useGetRecentExpenses();
  const { data: categories, isPending: isCategoriesLoading } = useGetCategories();
  const [tableData,setTableData] = useState<Expense[]>([]);
const getDataTable= () => {
  
  if(expenses && categories){

    for (var i = 0, len = expenses.length; i < len; i++) {        
      const expense = expenses[i];      
      const index = categories.findIndex((cat:Category)=>cat._id===expense.category);      
       expensesWithNames.push({...expense,category:index?categories[index].name:''})
    }
    setTableData(expensesWithNames)
  }
}
  let expensesWithNames: Expense[]=[];
  useEffect(() => {
    getDataTable();
  }, [expenses,categories,isExpensesLoading,isCategoriesLoading,isFetchedAfterMount])

  
  

  
  return (
    <div className="flex flex-1">
      <div className="home-container h-screen">
        <div className="home-expenses">
          <h2 className="h3-bold mmd:h2-bold text-start w-full">Expenses</h2>
          {isExpensesLoading && isCategoriesLoading && !expenses && !categories ? (
            <Loader />
          ) : (
            <ExpenseTable data={tableData!} categories={categories}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home