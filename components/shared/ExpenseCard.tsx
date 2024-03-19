"use client";

import { useUserContext } from "@/app/context/AuthContext";
import { Expense } from "@/app/types";
import { multiFormatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ExpenseCardProps = {
    expense: Expense;
  };

const ExpenseCard = ( {expense} : ExpenseCardProps) => {
  const { user } = useUserContext();

  return (
    <div className="expense-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
         

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {user.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
            •
              <p className="subtle-semibold lg:small-regular">
                Expense is added
              </p>
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(expense.date.toString())}
              </p>
              
            </div>
          </div>
        </div>

        <Link
          href={`/expenses/edit/${expense._id}`}
        >
          <Image
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link href={`/expenses/${expense._id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{`${expense.name} costs ${expense.amount}$`}</p> 
          <p></p>
          <p></p>
          <ul className="flex gap-1 mt-2">
            
              <li key={`${expense._id}${user._id}`} className="text-light-3 small-regular">
                #{expense.description}
              </li>
            
          </ul>
        </div>

        
      </Link>
    </div>
  );
};

export default ExpenseCard;
