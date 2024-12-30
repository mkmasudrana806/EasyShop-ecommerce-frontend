'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const sizeGuideData = {
  men: [
    { size: 'S', chest: '36-38', waist: '30-32', hips: '36-38' },
    { size: 'M', chest: '38-40', waist: '32-34', hips: '38-40' },
    { size: 'L', chest: '40-42', waist: '34-36', hips: '40-42' },
    { size: 'XL', chest: '42-44', waist: '36-38', hips: '42-44' },
  ],
  women: [
    { size: 'S', chest: '33-35', waist: '25-27', hips: '35-37' },
    { size: 'M', chest: '35-37', waist: '27-29', hips: '37-39' },
    { size: 'L', chest: '37-39', waist: '29-31', hips: '39-41' },
    { size: 'XL', chest: '39-41', waist: '31-33', hips: '41-43' },
  ],
}

export function SizeGuide() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Size Guide</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
          <DialogDescription>
            Find your perfect fit with our size guide.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="men" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="men">Men</TabsTrigger>
            <TabsTrigger value="women">Women</TabsTrigger>
          </TabsList>
          <TabsContent value="men">
            <SizeTable data={sizeGuideData.men} />
          </TabsContent>
          <TabsContent value="women">
            <SizeTable data={sizeGuideData.women} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function SizeTable({ data }: { data: { size: string; chest: string; waist: string; hips: string }[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Size</TableHead>
          <TableHead>Chest</TableHead>
          <TableHead>Waist</TableHead>
          <TableHead>Hips</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.size}>
            <TableCell className="font-medium">{row.size}</TableCell>
            <TableCell>{row.chest}</TableCell>
            <TableCell>{row.waist}</TableCell>
            <TableCell>{row.hips}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

