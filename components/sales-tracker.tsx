import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from 'lucide-react'

interface Sale {
  id: string
  item: string
  amount: number
  date: string
}

export function SalesTracker() {
  const [sales, setSales] = useState<Sale[]>([])
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const storedSales = localStorage.getItem('sales')
    if (storedSales) {
      setSales(JSON.parse(storedSales))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales))
  }, [sales])

  const addSale = () => {
    if (item && amount) {
      const newSale: Sale = {
        id: Date.now().toString(),
        item,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString()
      }
      setSales([newSale, ...sales])
      setItem('')
      setAmount('')
    }
  }

  const updateSale = (id: string) => {
    setSales(sales.map(sale => 
      sale.id === id ? { ...sale, item, amount: parseFloat(amount) } : sale
    ))
    setEditingId(null)
    setItem('')
    setAmount('')
  }

  const deleteSale = (id: string) => {
    setSales(sales.filter(sale => sale.id !== id))
  }

  const startEditing = (sale: Sale) => {
    setEditingId(sale.id)
    setItem(sale.item)
    setAmount(sale.amount.toString())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="flex-grow"
          />
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-32"
          />
          <Button onClick={editingId ? () => updateSale(editingId) : addSale}>
            {editingId ? 'Update' : 'Add Sale'}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.item}</TableCell>
                <TableCell>${sale.amount.toFixed(2)}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => startEditing(sale)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteSale(sale.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

