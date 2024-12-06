'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  price: number
  currency: 'USD' | 'CRC'
}

interface Sale {
  id: string
  productId: string
  productName: string
  quantity: number
  total: number
  currency: 'USD' | 'CRC'
  date: string
}

const exchangeRate = 500 // 1 USD = 500 CRC (This is a fixed rate for simplicity)

export default function SaleTracker() {
  const [products, setProducts] = useState<Product[]>([])
  const [sales, setSales] = useState<Sale[]>([])
  const [newProduct, setNewProduct] = useState({ name: '', price: '', currency: 'USD' })

  useEffect(() => {
    const storedProducts = localStorage.getItem('gymProducts')
    const storedSales = localStorage.getItem('gymSales')
    if (storedProducts) setProducts(JSON.parse(storedProducts))
    if (storedSales) setSales(JSON.parse(storedSales))
  }, [])

  useEffect(() => {
    localStorage.setItem('gymProducts', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('gymSales', JSON.stringify(sales))
  }, [sales])

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const newProductEntry = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: Number(newProduct.price),
        currency: newProduct.currency as 'USD' | 'CRC'
      };

      // Agregar el nuevo producto a la lista de productos
      setProducts([...products, newProductEntry]);

      // Crear una nueva entrada de venta
      const sale: Sale = {
        id: Date.now().toString(),
        productId: newProductEntry.id,
        productName: newProductEntry.name,
        quantity: 1, // Puedes cambiar esto a la cantidad que desees
        total: newProductEntry.price * 1, // Total para la cantidad de 1
        currency: newProductEntry.currency,
        date: new Date().toLocaleString()
      };

      // Agregar la nueva venta al historial de ventas
      setSales([...sales, sale]);

      // Limpiar el formulario de entrada
      setNewProduct({ name: '', price: '', currency: 'USD' });
    }
  }

  const formatCurrency = (amount: number, currency: 'USD' | 'CRC') => {
    return currency === 'USD'
      ? `$${amount.toFixed(2)}`
      : `₡${amount.toFixed(0)}`
  }

  const convertCurrency = (amount: number, fromCurrency: 'USD' | 'CRC', toCurrency: 'USD' | 'CRC') => {
    if (fromCurrency === toCurrency) return amount
    return fromCurrency === 'USD' ? amount * exchangeRate : amount / exchangeRate
  }

  return (
    <div className="container mx-auto pt-3 p-1">
      <h1 className="text-2xl font-bold mb-4">GYM SALE TRACKER</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Enter the details of the new product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Select
              value={newProduct.currency}
              onValueChange={(value) => setNewProduct({ ...newProduct, currency: value as 'USD' | 'CRC' })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="CRC">CRC (Colones)</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addProduct}><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>Recent sales records</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total (Original)</TableHead>
                <TableHead>Total (USD)</TableHead>
                <TableHead>Total (CRC)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.productName}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>{formatCurrency(sale.total, sale.currency)}</TableCell>
                  <TableCell>{formatCurrency(convertCurrency(sale.total, sale.currency, 'USD'), 'USD')}</TableCell>
                  <TableCell>{formatCurrency(convertCurrency(sale.total, sale.currency, 'CRC'), 'CRC')}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}