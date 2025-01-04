import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <Card>
        <CardHeader>
          <CardTitle>EasyShop Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>At EasyShop, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
          
          <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
          <p>We collect personal information that you provide to us, such as name, email address, postal address, phone number, and payment information when you register for an account, place an order, or subscribe to our newsletter.</p>
          
          <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you promotional emails, and to communicate with you about your account or orders.</p>
          
          <h2 className="text-xl font-semibold mt-4">3. Information Sharing and Disclosure</h2>
          <p>We may share your information with third-party service providers to help us provide our services and fulfill our contracts with you. We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.</p>
          
          <h2 className="text-xl font-semibold mt-4">4. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
          
          <h2 className="text-xl font-semibold mt-4">5. Cookies</h2>
          <p>We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction.</p>
          
          <h2 className="text-xl font-semibold mt-4">6. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies.</p>
          
          <h2 className="text-xl font-semibold mt-4">7. Changes to This Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
          
          <h2 className="text-xl font-semibold mt-4">8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@easyshop.com.</p>
          
          <p className="mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  )
}

