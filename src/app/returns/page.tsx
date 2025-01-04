import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ReturnsExchangesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Returns & Exchanges</h1>
      <Card>
        <CardHeader>
          <CardTitle>Returns and Exchanges Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>At EasyShop, we want you to be completely satisfied with your purchase. If you&apos;re not happy with your order, we&apos;re here to help. Please review our returns and exchanges policy below.</p>
          
          <h2 className="text-xl font-semibold mt-4">Return Policy</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You have 30 days from the date of delivery to return most items for a full refund.</li>
            <li>Items must be unused, unworn, and in their original packaging with all tags attached.</li>
            <li>Certain items, such as personalized products or intimate apparel, are not eligible for return due to hygiene reasons.</li>
            <li>Return shipping costs are the responsibility of the customer unless the item is defective or we made an error.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">Exchange Policy</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Exchanges are processed as a return followed by a new order.</li>
            <li>If you need a different size or color, please return the original item and place a new order for the desired product.</li>
            <li>The same 30-day policy applies to exchanges.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-4">How to Initiate a Return or Exchange</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Log in to your EasyShop account and go to your order history.</li>
            <li>Select the item you wish to return and choose the reason for the return.</li>
            <li>Print the provided return label or follow the instructions for returning the item.</li>
            <li>Pack the item securely and attach the return label to the package.</li>
            <li>Drop off the package at the specified carrier location.</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-4">Refund Process</h2>
          <p>Once we receive and process your return, we will issue a refund to your original payment method. Please allow 5-10 business days for the refund to appear on your statement.</p>
          
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Q: Can I return a gift?</h3>
                    <p>A: Yes, you can return a gift for store credit or exchange. You&apos;ll need the order number or gift receipt.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Q: What if my item is defective?</h3>
                    <p>A: If you receive a defective item, please contact our customer service team immediately. We&apos;ll arrange for a return or replacement at no cost to you.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Q: Do you offer free returns?</h3>
                    <p>A: We offer free returns for defective items or if we made an error in your order. For other returns, shipping costs are the responsibility of the customer.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <p className="mt-8">If you have any questions about our returns and exchanges policy, please don&apos;t hesitate to contact our customer service team at support@easyshop.com or call us at 1-800-EASYSHOP.</p>
        </CardContent>
      </Card>
    </div>
  )
}

