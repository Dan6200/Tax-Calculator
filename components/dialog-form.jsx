"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Plus, Minus } from "lucide-react";

const formSchema = z
  .object({
    "extra-field-0": z.string(),
  })
  .catchall(z.string());

export function DialogForm({ setDynamicFields, dynamicFields, DialogClose }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [extraFieldCount, setExtraFieldCount] = useState(0);

  function onSubmit(values, e) {
    e.preventDefault();
    setDynamicFields([...dynamicFields, ...Object.values(values)]);
    console.log(dynamicFields);
    console.log(Object.values(values));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col my-8"
      >
        <div
          className={`grid ${
            extraFieldCount < 3 ? "grid-flow-row" : "grid-flow-col grid-rows-3"
          } gap-8 max-h-96 w-full`}
        >
          {new Array(extraFieldCount)
            .fill("extra-field-")
            .map((name, index) => (
              <FormField
                control={form.control}
                name={name + (index + 1)}
                key={name + (index + 1)}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
        </div>
        <div className="flex space-x-4 my-8">
          <FormField
            control={form.control}
            name="extra-field-0"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" className="w-80" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="outline"
            className="w-fit"
            onClick={(e) => {
              e.preventDefault();
              setExtraFieldCount(extraFieldCount < 6 ? extraFieldCount + 1 : 6);
            }}
          >
            <Plus />
          </Button>
          {extraFieldCount > 0 && (
            <Button
              variant="outline"
              className="w-fit"
              onClick={(e) => {
                e.preventDefault();
                setExtraFieldCount(
                  extraFieldCount > 0 ? extraFieldCount - 1 : 0
                );
              }}
            >
              <Minus />
            </Button>
          )}
        </div>
        <DialogClose asChild>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
