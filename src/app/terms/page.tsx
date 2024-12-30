import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <Card>
        <CardHeader>
          <CardTitle>EasyShop Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Welcome to EasyShop. By using our services, you agree to these terms. Please read them carefully.</p>
          
          <h2 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h2>
          <p>By accessing or using EasyShop, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
          
          <h2 className="text-xl font-semibold mt-4">2. Use of Services</h2>
          <p>You may use EasyShop for lawful purposes only. You are prohibited from violating or attempting to violate the security of the website, including, without limitation, accessing data not intended for you or logging onto a server or account which you are not authorized to access.</p>
          
          <h2 className="text-xl font-semibold mt-4">3. User Accounts</h2>
          <p>To access certain features of EasyShop, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
          
          <h2 className="text-xl font-semibold mt-4">4. Product Information</h2>
          <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
          
          <h2 className="text-xl font-semibold mt-4">5. Pricing and Availability</h2>
          <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice.</p>
          
          <h2 className="text-xl font-semibold mt-4">6. Intellectual Property</h2>
          <p>The content, organization, graphics, design, and other matters related to EasyShop are protected under applicable copyrights, trademarks, and other proprietary rights.</p>
          
          <h2 className="text-xl font-semibold mt-4">7. Limitation of Liability</h2>
          <p>EasyShop shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages resulting from your use or inability to use the service.</p>
          
          <h2 className="text-xl font-semibold mt-4">8. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
          
          <h2 className="text-xl font-semibold mt-4">9. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Your continued use of EasyShop after any such changes constitutes your acceptance of the new Terms of Service.</p>
          
          <p className="mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  )
}

