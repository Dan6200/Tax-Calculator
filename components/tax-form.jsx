"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  basic: z.number({
    required_error: "Your Basic Income is required",
    invalid_type_error: "This must be a number",
  }),
  transport: z.number({
    invalid_type_error: "This must be a number",
  }),
});

export function TaxForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basic: 0,
      transport: 0,
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="basic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic</FormLabel>
              <FormControl>
                <Input placeholder="100,000" {...field} />
              </FormControl>
              <FormDescription>This is your Basic Salary</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transportation</FormLabel>
              <FormControl>
                <Input placeholder="50,000" {...field} />
              </FormControl>
              <FormDescription>
                This is your the Salary amount allocated to transportation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
