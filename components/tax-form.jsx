"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Minus } from "lucide-react";
import { DialogForm } from "./dialog-form";

const formSchema = z
  .object({
    basic: z.number({
      required_error: "Your Basic Income is required",
      invalid_type_error: "This must be a number",
    }),
    transportation: z.number({
      required_error: "Your Basic Income is required",
      invalid_type_error: "This must be a number",
    }),
    housing: z.number({
      required_error: "Your Basic Income is required",
      invalid_type_error: "This must be a number",
    }),
  })
  .catchall(
    z.union([
      z.number({
        required_error: "This field is required",
        invalid_type_error: "The value must be a number",
      }),
      z.boolean(),
    ])
  );

export function TaxForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basic: 1000,
      transportation: 0,
      housing: 0,
    },
  });
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = form;

  const [dynamicFields, setDynamicFields] = useState([]);

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <h2 className="text-center text-2xl">Annual Payroll</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 mx-auto flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="basic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("basic", { valueAsNumber: true })}
                  type="number"
                  step={500}
                  min={1000}
                  max={10000000000}
                />
              </FormControl>
              <FormDescription className="capitalize">
                This is your basic salary
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transportation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transportation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("transportation", { valueAsNumber: true })}
                  type="number"
                  step={500}
                  min={0}
                  max={10000000000}
                />
              </FormControl>
              <FormDescription className="capitalize">
                This is your transportation allowance
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="housing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Housing</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("housing", { valueAsNumber: true })}
                  type="number"
                  step={500}
                  min={0}
                  max={10000000000}
                />
              </FormControl>
              <FormDescription className="capitalize">
                This is your housing allowance
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {dynamicFields.length > 0 &&
          dynamicFields.map((fieldName) => (
            <FormField
              control={form.control}
              name={fieldName}
              key={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldName[0].toUpperCase() + fieldName.slice(1)}
                  </FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        {...field}
                        {...register(fieldName, { valueAsNumber: true })}
                        type="number"
                        step={500}
                        min={0}
                        max={10000000000}
                      />
                    </FormControl>
                    <Button
                      variant="outline"
                      className="w-fit"
                      onClick={(e) => {
                        e.preventDefault();
                        setDynamicFields(
                          dynamicFields.filter((entry) => entry !== fieldName)
                        );
                        unregister(fieldName);
                      }}
                    >
                      <Minus />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        <h3>Statutory Deductions...</h3>
        <FormField
          control={form.control}
          name="nhis"
          render={({ field }) => (
            <FormItem className="mt-0 flex space-x-2 items-start space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex flex-col leading-none space-y-1">
                <FormLabel>N.H.I.S.?</FormLabel>
                <FormDescription>
                  Does your employer contribute to health insurance according to
                  the National Health Insurance Scheme?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nhf"
          render={({ field }) => (
            <FormItem className="mt-0 flex space-x-2 items-start space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex flex-col leading-none space-y-1">
                <FormLabel>N.H.F.?</FormLabel>
                <FormDescription>
                  Does your employer contribute towards the National Health
                  Fund?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add New Fields</Button>
          </DialogTrigger>
          <DialogContent className="w-fit h-4/5">
            <DialogHeader>
              <DialogTitle className="text-center">
                Add Additional Salary Breakdowns
              </DialogTitle>
              <div className="my-8">
                <DialogForm
                  {...{
                    setDynamicFields,
                    dynamicFields,
                    DialogClose,
                  }}
                />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
