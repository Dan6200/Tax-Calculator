"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const formSchema = z
  .object({
    basic: z.number({
      required_error: "Your Basic Income is required",
      invalid_type_error: "This must be a number",
    }),
    transport: z.number({
      invalid_type_error: "This must be a number",
    }),
    housing: z.number({
      invalid_type_error: "This must be a number",
    }),
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

  const [dynamicFields, setDynamicFields] = useState({});
  const [currentField, setCurrentField] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [optInputCount, setOptInputCount] = useState(0);

  const addDynamicField = (field, value) => {
    setDynamicFields({
      ...dynamicFields,
      [field]: value,
    });
  };

  console.log(dynamicFields);

  function onSubmit(values) {
    console.log({ ...data, ...dynamicFields });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
              name="housing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldName[0].toUpperCase() + fieldName.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
          ))}
        <Dialog>
          <Button onClick={(e) => e.preventDefault()} variant="outline">
            <DialogTrigger>Add New Fields</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Additional Salary Breakdowns</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
