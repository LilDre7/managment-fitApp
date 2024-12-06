"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Member {
  id: string;
  name: string;
  email: string;
  expiredDate: string;
  age: number;
  status: "Active" | "Inactive";
  tel: string;
  lastVisited: string;
}

interface MemberFormProps {
  member?: Member | null;
  onSubmit: (member: Omit<Member, "id">) => void;
  onCancel: () => void;
}

export function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState<Omit<Member, "id">>({
    name: "",
    email: "",
    expiredDate: "",
    age: 0,
    status: "Active",
    tel: "",
    lastVisited: "",
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member ? "Edit Member" : "Add New Member"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="expiredDate">Expired Date</Label>
            <Input
              id="expiredDate"
              name="expiredDate"
              type="date"
              value={formData.expiredDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            <RadioGroup
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value as "Active" | "Inactive",
                }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Inactive" id="inactive" />
                <Label htmlFor="inactive">Inactive</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="tel">Telephone</Label>
            <Input
              id="tel"
              name="tel"
              type="tel"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastVisited">Last Visited</Label>
            <Input
              id="lastVisited"
              name="lastVisited"
              type="date"
              value={formData.lastVisited}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{member ? "Update" : "Add"} Member</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
