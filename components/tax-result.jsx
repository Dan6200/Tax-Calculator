import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaxResult({ taxResult, setPage }) {
  const { tax, gross } = taxResult;
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        <Button
          variant="outline"
          className="w-fit relative left-0 h-fit p-1"
          onClick={(e) => {
            e.preventDefault();
            setPage(1);
          }}
        >
          <MoveLeft />
        </Button>
        <CardTitle className="capitalize font-semibold text-xl">
          Your total Annual Tax Amount is
        </CardTitle>
        <Button
          variant="disable"
          className="border-none w-6 relative left-0 h-6 p-1"
        ></Button>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-3xl text-center font-semibold">
          {tax.toLocaleString("en-NG", {
            currency: "NGN",
            style: "currency",
          })}
        </p>
        <p className="capitalize text-center">
          Your effective tax rate is{" "}
          {tax > 0 ? ((tax / gross) * 100).toFixed(2) : 0}%
        </p>
        <p className="capitalize text-center">
          Your monthly tax amount is{" "}
          {(tax / 12).toLocaleString("en-NG", {
            currency: "NGN",
            style: "currency",
          })}
        </p>
        <p className="capitalize text-center">
          Your annual gross income is{" "}
          {gross.toLocaleString("en-NG", {
            currency: "NGN",
            style: "currency",
          })}
        </p>
        <p className="capitalize text-center">
          Your annual net income after tax is{" "}
          {(gross - tax).toLocaleString("en-NG", {
            currency: "NGN",
            style: "currency",
          })}
        </p>
      </CardContent>
    </>
  );
}
