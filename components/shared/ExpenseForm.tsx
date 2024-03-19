import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import { ExpenseFormProps } from "@/app/types";
import { useUserContext } from "@/app/context/AuthContext";
import { useCreateExpense, useGetCategories, useUpdateExpense } from "@/lib/react-query/queries";
import { ExpenseSchema } from "@/lib/vlaidations";
import {  useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CalendarIcon, Loader } from "lucide-react";
import { formatDate } from "date-fns";
import Link from "next/link";

const ExpenseForm = ({ expense, action }: ExpenseFormProps) => {
  const { mutateAsync: createExpense, isPending: isCreatingExpense } =
    useCreateExpense();
    const { mutateAsync: updateExpense, isPending: isUpdatingExpense } =
    useUpdateExpense();
    const { data: categories, isPending: isCategoriesLoading } = useGetCategories();

  const { user } = useUserContext();
  const { toast } = useToast();
  const router = useRouter()
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: expense ? expense.name : "",
      date: expense ? expense.date : new Date(),
      amount: expense ? expense.amount : 1,
      category: expense ? expense.category:"",
      description : expense ? expense.description : "",
      user : user._id
    },
  });

  
  async function onSubmit(values: z.infer<typeof ExpenseSchema>) {
    
    if (expense && action === "Update") {
      
      const updatedExpense = await updateExpense({
        ...values,
        _id: expense?._id,

      });
      if (!updatedExpense) {

        toast({
          title: `${action} expense failed. Please try again.`,
        });
        return router.refresh();

      }
      return router.replace("/expenses");
    }
    
    const newExpense = await createExpense({
      ...values,
      user: user._id,
    });
    if (!newExpense)
      {toast({
        title: `${action} expense failed. Please try again.`,
      });
      return router.refresh();
    }
    router.replace("/expenses");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expense date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " text-left font-normal h-12",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-dark-4" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select  onValueChange={field.onChange}  defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select expense category" />
                  </SelectTrigger>
                </FormControl>
                
                {isCategoriesLoading && !categories ? (
                  <SelectContent className="shad-select">       <SelectItem   value={'Loading'}>...Loading</SelectItem>         </SelectContent>
                  ) : (
                    <SelectContent className="shad-select">
              {categories.map((cat: any) => {
              return (
                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
              );
            })}
            </SelectContent>
          )}                  
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Amount</FormLabel>
              <FormControl>
                <Input type="number" className="shad-input" {...field }  />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Description</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            <Link href={'/expenses'}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isCreatingExpense || isUpdatingExpense}
          >
            {(isCreatingExpense || isUpdatingExpense) && <Loader />}
            {action} Expense
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExpenseForm;
