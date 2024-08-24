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
import { Plus } from "lucide-react";
import { DialogForm } from "./dialog-form";

const formSchema = z
  .object({
    basic: z.number({
      required_error: "Your Basic Income is required",
      invalid_type_error: "This must be a number",
    }),
    transport: z
      .number({
        invalid_type_error: "This must be a number",
      })
      .optional(),
    housing: z
      .number({
        invalid_type_error: "This must be a number",
      })
      .optional(),
  })
  .catchall(
    z.number({
      invalid_type_error: "This must be a number",
    })
  );

export function TaxForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  console.log(errors);

  const [dynamicFields, setDynamicFields] = useState([]);

  function onSubmit(values) {
    console.log({ ...values, ...dynamicFields });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col space-y-8"
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
              <FormDescription>This is your basic salary</FormDescription>
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
                <Input
                  {...field}
                  {...register("transport", { valueAsNumber: true })}
                  type="number"
                  step={500}
                  min={1000}
                  max={10000000000}
                />
              </FormControl>
              <FormDescription>
                This is the part of your salary allocated to transportation
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
                  min={1000}
                  max={10000000000}
                />
              </FormControl>
              <FormDescription>
                This is the part of your salary allocated to housing
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
                  <FormControl>
                    <Input
                      {...field}
                      {...register(fieldName, { valueAsNumber: true })}
                      type="number"
                      step={500}
                      min={1000}
                      max={10000000000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add New Fields</Button>
          </DialogTrigger>
          <DialogContent className="w-fit h-4/5">
            <DialogHeader>
              <DialogTitle className="text-center">
                Add Additional Salary Breakdowns
              </DialogTitle>
              <DialogDescription>
                <DialogForm
                  {...{
                    setDynamicFields,
                    dynamicFields,
                    DialogClose,
                  }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
