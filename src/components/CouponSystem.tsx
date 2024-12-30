'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from 'lucide-react'

interface CouponSystemProps {
  vendorId: number
  onCouponApplied: (vendorDiscount: number, globalDiscount: number) => void
}

interface Coupon {
  code: string
  discount: number
  type: 'vendor' | 'global'
}

// In a real application, these would be fetched from an API
const availableCoupons: Coupon[] = [
  { code: 'VENDOR10', discount: 10, type: 'vendor' },
  { code: 'GLOBAL15', discount: 15, type: 'global' },
]

export function CouponSystem({ vendorId, onCouponApplied }: CouponSystemProps) {
  const [couponCode, setCouponCode] = useState('')
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [appliedCoupons, setAppliedCoupons] = useState<Coupon[]>([])

  const handleApplyCoupon = async () => {
    // In a real application, this would be an API call to validate the coupon
    const foundCoupon = availableCoupons.find(coupon => coupon.code === couponCode)
    
    if (foundCoupon) {
      if (appliedCoupons.some(coupon => coupon.type === foundCoupon.type)) {
        setCouponStatus('invalid')
        return
      }
      
      setAppliedCoupons([...appliedCoupons, foundCoupon])
      setCouponStatus('valid')
      
      const vendorDiscount = appliedCoupons.find(coupon => coupon.type === 'vendor')?.discount || 0
      const globalDiscount = appliedCoupons.find(coupon => coupon.type === 'global')?.discount || 0
      
      onCouponApplied(vendorDiscount, globalDiscount)
    } else {
      setCouponStatus('invalid')
    }
    
    setCouponCode('')
  }

  const removeCoupon = (couponToRemove: Coupon) => {
    const updatedCoupons = appliedCoupons.filter(coupon => coupon.code !== couponToRemove.code)
    setAppliedCoupons(updatedCoupons)
    
    const vendorDiscount = updatedCoupons.find(coupon => coupon.type === 'vendor')?.discount || 0
    const globalDiscount = updatedCoupons.find(coupon => coupon.type === 'global')?.discount || 0
    
    onCouponApplied(vendorDiscount, globalDiscount)
  }

  return (
    <div className="mt-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
      </div>
      {couponStatus === 'valid' && (
        <Alert className="mt-2 bg-green-50 text-green-800 border-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Coupon applied successfully!</AlertDescription>
        </Alert>
      )}
      {couponStatus === 'invalid' && (
        <Alert className="mt-2 bg-red-50 text-red-800 border-red-300">
          <XCircle className="h-4 w-4" />
          <AlertDescription>Invalid coupon code or coupon type already applied. Please try again.</AlertDescription>
        </Alert>
      )}
      {appliedCoupons.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Applied Coupons:</h4>
          {appliedCoupons.map((coupon) => (
            <div key={coupon.code} className="flex justify-between items-center mb-2">
              <span>{coupon.code} ({coupon.discount}% off - {coupon.type})</span>
              <Button variant="outline" size="sm" onClick={() => removeCoupon(coupon)}>Remove</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

