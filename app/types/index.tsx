export type INavLink = {
    img_url: string;
    route: string;
    label: string;
  };

  export type IUser = {
    _id: string;
    name: string;
    email: string;
  
  };

  export type INewUser = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };  
  export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  };

  export type ExpenseFormProps = {
    expense?: Expense;
    action: "Create" | "Update";
  };

  export type ExpenseTableProps = {
    data: Expense[];
    categories: Category[]
  };

  export type Expense = {
    _id: string;
    name: string;
    date: Date;
    amount:number;
    description:string;
    category: string;
    user:string;
  };

  export type Category = {
    _id: string;
    name: string;
  };

  export type INewExpense={
    name: string;
    date: Date;
    amount:number;
    description?:string;
    category: string;
    user:string;}

  export type IUpdateExpense={
    _id: string;
  }
  