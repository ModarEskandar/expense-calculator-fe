import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewExpense, createNewUserAccount, deleteExpense, getCategories, getExpenseById, getRecentExpenses, resetPassword, signInUser, signOutUser, updateExpense } from "../api";
import { INewExpense, INewUser, IUpdateExpense } from "@/app/types";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewUserAccount(user),
  });
};

export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) => signInUser(user.email,user.password),
    });
  };

export const useResetPassword = () =>{
  return useMutation({
    mutationFn: ( user: Partial<INewUser>) => resetPassword(user),
  })
}

  export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (expense: INewExpense) => createNewExpense(expense),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_EXPENSES],
        });
      },
    });
  };

  export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (expense: IUpdateExpense) => updateExpense(expense),
      onSuccess: (data ) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_EXPENSE_BY_ID, (data as unknown as IUpdateExpense)?._id],
          
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_EXPENSES],
        });
      },
    });
  };

  export const useGetCategories = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CATEGORIES],
      queryFn: ()=>getCategories(),
    });
  };

  export const useGetRecentExpenses = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_EXPENSES],
      queryFn: getRecentExpenses,
    });
  };

  export const useGetExpenseById = (expenseId?: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_EXPENSE_BY_ID, expenseId],
      queryFn: () => getExpenseById(expenseId),
      enabled: !!expenseId,
    });
  };



  export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (
        expense_id:string
      ) => deleteExpense(expense_id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_EXPENSES],
        });
      },
    });
  };