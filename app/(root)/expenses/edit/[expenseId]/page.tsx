"use client";

import ExpenseForm from "@/components/shared/ExpenseForm";
import { useGetExpenseById } from "@/lib/react-query/queries";
import { Loader, EditIcon } from "lucide-react";
import { useParams } from "next/navigation";

const UpdateExpense = () => {
    const params = useParams<{  expenseId: string }>()
    const { data: expense, isPending:isGettingExpense } = useGetExpenseById(params.expenseId);
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start w-full gap-3">
        <EditIcon size={40} className="text-purple" />          <h2 className="h3-bold md:h2-bold ">Update Expense</h2>
        </div>
        {isGettingExpense?<Loader/>:<ExpenseForm action="Update" expense={expense}/>}
      </div>
    </div>
  );
};

export default UpdateExpense;
