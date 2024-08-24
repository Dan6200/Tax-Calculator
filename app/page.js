import { TaxForm } from "@/components/tax-form";

export default function Home() {
  return (
    <main className="container p-8 sm:p-24">
      <h1 className="text-3xl text-center mb-16">Nigerian Tax Calculator</h1>
      <TaxForm />
    </main>
  );
}
