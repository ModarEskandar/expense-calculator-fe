"use client";

import { useUserContext } from "@/app/context/AuthContext";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword } from "@/lib/api";
import { useResetPassword, useSignInAccount } from "@/lib/react-query/queries";
import { RestPasswordSchema } from "@/lib/vlaidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "react-day-picker";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordForm = () => {
    const { toast } = useToast();
    const { mutateAsync: resetPassword, isPending: isResettingPassword } =
    useResetPassword();
    const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
   
  const form = useForm<z.infer<typeof RestPasswordSchema>>({
    resolver: zodResolver(RestPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm:""
    },
  });
  async function onSubmit(values: z.infer<typeof RestPasswordSchema>) {
    
    const newUser = await resetPassword(values);
    console.log(newUser);
    
    if (!newUser)
      return toast({
        title: "Reset Password failed. Please try again later.",
      });
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    console.log(session);

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
          Reset your password
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-12">
          Enter your email and update your password
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-4 w-full"
        >
          
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
            {isResettingPassword || isSigningIn? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
          
          
        </form>
      </div>
    </Form>
  );
  };
  
  export default ResetPasswordForm;