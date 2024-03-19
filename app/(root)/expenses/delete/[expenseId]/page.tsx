"use client";

import ExpenseCard from "@/components/shared/ExpenseCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteExpense, useGetExpenseById } from "@/lib/react-query/queries";
import { Loader, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const DeleteExpense = () => {
    const params = useParams<{  expenseId: string }>()
    const { data: expense, isPending:isGettingExpense } = useGetExpenseById(params.expenseId);
    const { mutateAsync: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();
    const { toast } = useToast();
    const router = useRouter()
    const deleteExpenseSubmit =  async () => {
      const updatedExpense = await deleteExpense(expense?._id!);
      
      if (!updatedExpense) {
        
        toast({
          title: `Delete expense failed. Please try again.`,
        });
      }
      else router.replace(`/expenses`); 
    }
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start w-full gap-3">
        <TrashIcon size={40} className="text-purple" />          <h2 className="h3-bold md:h2-bold ">Delete Expense</h2>
        </div>
        {isGettingExpense?<Loader/>:<ExpenseCard  expense={expense!}/>}
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            <Link href={'/expenses'}>Cancel</Link>
          </Button>
          <Button
            className="shad-button_primary whitespace-nowrap"
            disabled={isDeletingExpense}
            onClick={()=>deleteExpenseSubmit()}
          >
            {isDeletingExpense && <Loader />}
            Delete Expense
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default DeleteExpense;
