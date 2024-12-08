import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoiceList } from "../../components/Delivery/invoice/InvoiceList"
import { CreditCardForm } from "../../components/Delivery/invoice/CreditCardForm"
import { ShippingCreditList } from "../../components/Delivery/invoice/ShippingCreditList"

export function InvoicesPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex flex-wrap justify-start">
          <TabsTrigger value="invoices" className="flex-grow sm:flex-grow-0">Invoices</TabsTrigger>
          <TabsTrigger value="credit-card" className="flex-grow sm:flex-grow-0">Credit Card</TabsTrigger>
          <TabsTrigger value="shipping-credit" className="flex-grow sm:flex-grow-0">Shipping Credit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4">
          <InvoiceList />
        </TabsContent>
        
        <TabsContent value="credit-card">
          <div className="rounded-lg border p-4 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">Credit Card Information</h2>
            <CreditCardForm />
          </div>
        </TabsContent>
        
        <TabsContent value="shipping-credit">
          <div className="rounded-lg border p-4 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Credit</h2>
            <ShippingCreditList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

