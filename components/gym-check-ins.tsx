'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CheckIn {
  id: string;
  name: string;
  membershipType: string;
  checkInTime: string;
}

export function GymCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [name, setName] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const storedCheckIns = localStorage.getItem('checkIns');
    if (storedCheckIns) {
      setCheckIns(JSON.parse(storedCheckIns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkIns', JSON.stringify(checkIns));
  }, [checkIns]);

  const addCheckIn = () => {
    if (!name.trim() || !membershipType.trim()) {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    const newCheckIn = {
      id: Date.now().toString(),
      name,
      membershipType,
      checkInTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setCheckIns((prevCheckIns) => [newCheckIn, ...prevCheckIns]);
    toast('Se agrego exitosamente!', {
      icon: '👏',
    });

    setName('');
    setMembershipType('');
  };

  const updateCheckIn = (id: string) => {
    setCheckIns(checkIns.map(checkIn =>
      checkIn.id === id ? { ...checkIn, name, membershipType } : checkIn
    ));
    setEditingId(null);
    setName('');
    setMembershipType('');
    toast.success("Se actualizó el usuario exitosamente");
  };

  const deleteCheckIn = (id: string) => {
    setCheckIns(checkIns.filter(checkIn => checkIn.id !== id));
    toast.error("Se eliminó el usuario exitosamente");
  };

  const startEditing = (checkIn: CheckIn) => {
    setEditingId(checkIn.id);
    setName(checkIn.name);
    setMembershipType(checkIn.membershipType);
  };

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'>GYM CHECK-IN CLIENTS</h1>
      </div>
      <Card>
        <CardContent>
          <div className="flex space-x-2 mb-4 pt-6">
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
                <SelectItem value="GYM PLAN">GYM PLAN</SelectItem>
                <SelectItem value="GYM SIMPLE">GYM SIMPLE</SelectItem>
                <SelectItem value="PERSONAL">PERSONAL</SelectItem>
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
                <TableRow className='text-base' key={checkIn.id}>
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
    </>
  );
}