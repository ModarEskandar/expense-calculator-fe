"use client";
import { useUserContext } from "@/app/context/AuthContext";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { SignupSchema } from "@/lib/vlaidations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignupForm = () => {
    
    
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
  useCreateUserAccount();
const { mutateAsync: signInAccount, isPending: isSigningIn } =
  useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm:""
    },
  });
  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    
    const newUser = await createUserAccount(values);
    
    if (!newUser)
      return toast({
        title: "Sign up failed. Please try again later.",
      });
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return toast({
        title: "Sign in failed. Please try again later.",
      });
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      redirect("/expenses");
    } else
      return toast({
        title: "Sign up failed. Please try again later.",
      });
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col flex-center">
        
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-12">
          Enter your details please to use Expense Calculator
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser || isSigningIn? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?{" "}
            <Link
              href={"/signin"}
              className="text-primary-500 text-small-semibold "
            >
              {" "}
              Log in
            </Link>
          </p>
          
        </form>
      </div>
    </Form>
  );
  };
  
  export default SignupForm;