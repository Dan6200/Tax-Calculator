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
import axios from "axios";

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
    nhis: z.boolean(),
    nhf: z.boolean(),
    does_voluntary_pension: z.boolean(),
    voluntary_pension: z.number({
      invalid_type_error: "This value must be a number",
    }),
  })
  .catchall(
    z.number({
      required_error: "This field is required",
      invalid_type_error: "The value must be a number",
    })
  );

export function TaxForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basic: 1000,
      transportation: 0,
      housing: 0,
      nhis: false,
      nhf: false,
      does_voluntary_pension: false,
      voluntary_pension: 0,
    },
  });
  const {
    watch,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = form;

  const [dynamicFields, setDynamicFields] = useState([]);

  async function onSubmit(data) {
    // convert to annual amount
    if (data["does_voluntary_pension"] && data["voluntary_pension"])
      data = { ...data, voluntary_pension: data.voluntary_pension * 12 };
    const response = await axios.post("http://127.0.0.1:5000/calculate", data);
    console.log(response.data);
  }

  return (
    <div className="flex mx-auto w-2/3 flex-col space-y-8">
      <Form {...form}>
        <h2 className="text-center text-2xl mb-8">Annual Payroll</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-8"
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
                    min={1000}
                    step={0.01}
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
                    step={0.01}
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
                    step={0.01}
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
                          step={0.01}
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
                    Does your employer contribute to health insurance according
                    to the National Health Insurance Scheme?
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
          <FormField
            control={form.control}
            name="does_voluntary_pension"
            render={({ field }) => (
              <FormItem className="mt-0 flex space-x-2 items-start space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="flex flex-col leading-none space-y-1">
                  <FormLabel>Voluntary Pension Contribution?</FormLabel>
                  <FormDescription>
                    Do you add extra contributions to your pension fund?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {watch("does_voluntary_pension") && (
            <FormField
              control={form.control}
              name="voluntary_pension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voluntary Pension Monthly Contribution</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      {...register("voluntary_pension", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      step={0.01}
                      min={0}
                      max={10000000}
                    />
                  </FormControl>
                  <FormDescription className="capitalize">
                    Must be less than 1/3 of your total monthly salary
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
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
    </div>
  );
}
