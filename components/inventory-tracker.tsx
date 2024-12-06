import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  count: number
}

export function InventoryTracker() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Large Water Bottles', count: 50 },
    { id: '2', name: 'Small Water Bottles', count: 100 },
    { id: '3', name: 'Towels', count: 75 },
    { id: '4', name: 'Cookies', count: 200 },
  ])

  const [newItemName, setNewItemName] = useState('')

  const addItem = () => {
    if (newItemName) {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: newItemName,
        count: 0
      }
      setInventory([...inventory, newItem])
      setNewItemName('')
    }
  }

  const updateCount = (id: string, increment: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count + increment) } : item
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="New item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={addItem}>Add Item</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => updateCount(item.id, -1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => updateCount(item.id, 1)} className="ml-2">
                    <Plus className="w-4 h-4" />
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

