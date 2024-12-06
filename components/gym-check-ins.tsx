import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from 'lucide-react'

interface CheckIn {
  id: string
  name: string
  membershipType: string
  checkInTime: string
}

export function GymCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [name, setName] = useState('')
  const [membershipType, setMembershipType] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const storedCheckIns = localStorage.getItem('checkIns')
    if (storedCheckIns) {
      setCheckIns(JSON.parse(storedCheckIns))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('checkIns', JSON.stringify(checkIns))
  }, [checkIns])

  const addCheckIn = () => {
    if (name && membershipType) {
      const newCheckIn: CheckIn = {
        id: Date.now().toString(),
        name,
        membershipType,
        checkInTime: new Date().toLocaleTimeString()
      }
      setCheckIns([newCheckIn, ...checkIns])
      setName('')
      setMembershipType('')
    }
  }

  const updateCheckIn = (id: string) => {
    setCheckIns(checkIns.map(checkIn => 
      checkIn.id === id ? { ...checkIn, name, membershipType } : checkIn
    ))
    setEditingId(null)
    setName('')
    setMembershipType('')
  }

  const deleteCheckIn = (id: string) => {
    setCheckIns(checkIns.filter(checkIn => checkIn.id !== id))
  }

  const startEditing = (checkIn: CheckIn) => {
    setEditingId(checkIn.id)
    setName(checkIn.name)
    setMembershipType(checkIn.membershipType)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gym Check-Ins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow"
          />
          <Select value={membershipType} onValueChange={setMembershipType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Membership Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={editingId ? () => updateCheckIn(editingId) : addCheckIn}>
            {editingId ? 'Update' : 'Check In'}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Membership Type</TableHead>
              <TableHead>Check-In Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkIns.map((checkIn) => (
              <TableRow key={checkIn.id}>
                <TableCell>{checkIn.name}</TableCell>
                <TableCell>{checkIn.membershipType}</TableCell>
                <TableCell>{checkIn.checkInTime}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => startEditing(checkIn)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteCheckIn(checkIn.id)}>
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

