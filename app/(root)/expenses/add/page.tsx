"use client";

import ExpenseForm from "@/components/shared/ExpenseForm";
import { SquarePlus } from "lucide-react";

const CreateExpense = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start w-full gap-3">
        <SquarePlus size={40} className="text-purple" />          <h2 className="h3-bold md:h2-bold ">Create Expense</h2>
        </div>
        <ExpenseForm action="Create"  />
      </div>
    </div>
  );
};

export default CreateExpense;
