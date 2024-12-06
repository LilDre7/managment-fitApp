"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  Bell,
  Download,
  Plus,
  User2,
  Edit,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import { MemberForm } from "./member-form";
import { GymCheckIns } from "./gym-check-ins";
import { InventoryTracker } from "./inventory-tracker";
import { SalesTracker } from "./sales-tracker";

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

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Member | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const sortedMembers = [...members].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const addMember = (member: Omit<Member, "id">) => {
    const newMember = { ...member, id: Date.now().toString() };
    setMembers([...members, newMember]);
    setIsAddingMember(false);
  };

  const updateMember = (updatedMember: Member) => {
    setMembers(
      members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
    setEditingMember(null);
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 w-12 h-12 rounded-lg" />
          <div>
            <h1 className="font-semibold text-xl">goJim</h1>
            <p className="text-sm text-gray-500">Gym Management</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          {["Home", "Analytics", "Trainer", "Membership", "Schedule"].map(
            (item) => (
              <Button
                key={item}
                variant="ghost"
                className={
                  activeNav === item ? "text-blue-500" : "text-gray-500"
                }
                onClick={() => setActiveNav(item)}
              >
                {item}
              </Button>
            )
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-1">Manage your</h2>
            <h2 className="text-3xl font-bold">Fitness business</h2>
            <p className="text-gray-500 text-sm mt-2">6 Aug 2024, 07:20am</p>
          </div>
          <div className="space-x-4">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setIsAddingMember(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Member
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              Manage Class
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 mb-2">Revenue</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold">$4.53k</h3>
                <span className="text-green-500 text-sm flex items-center">
                  <ArrowUpRight className="w-4 h-4" />
                  2.1%
                </span>
              </div>
              <p className="text-gray-500 text-sm">Month / July</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 mb-2">Members</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold">{members.length}</h3>
                <span className="text-green-500 text-sm flex items-center">
                  <ArrowUpRight className="w-4 h-4" />
                  1.8%
                </span>
              </div>
              <p className="text-gray-500 text-sm">Active Members</p>
            </CardContent>
          </Card>
          {/* Similar cards for Visited and Trainer stats */}
        </div>

        {/* Gym Capacity */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">Gym Capacity</h3>
                <p className="text-gray-500 text-sm">Indoor and outdoor</p>
              </div>
              <Badge variant="secondary" className="bg-gray-200">
                2
              </Badge>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < 56 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-gray-500 text-sm">Space Status</p>
              <p className="text-sm">56%</p>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">All Members</h3>
              <Input placeholder="Search" className="max-w-xs" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "name",
                    "expiredDate",
                    "age",
                    "status",
                    "tel",
                    "lastVisited",
                  ].map((column) => (
                    <TableHead
                      key={column}
                      className="cursor-pointer"
                      onClick={() => {
                        setSortDirection((prev) =>
                          sortColumn === column && prev === "asc"
                            ? "desc"
                            : "asc"
                        );
                        setSortColumn(column as keyof Member);
                      }}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      {sortColumn === column && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar />
                        <div>
                          <p>{member.name}</p>
                          <p className="text-gray-500 text-sm">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.expiredDate}</TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.tel}</TableCell>
                    <TableCell>{member.lastVisited}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingMember(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMember(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Gym Check-Ins */}
        <GymCheckIns />

        {/* Inventory Tracker */}
        <InventoryTracker />

        {/* Sales Tracker */}
        <SalesTracker />

        {/* Mobile App Promotion */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Get the Mobile App now</h3>
            <p className="text-gray-500 mb-4">
              Manage your business wherever you want with your thumbs
            </p>
            <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Download Now
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Member Form Modal */}
      {(isAddingMember || editingMember) && (
        <MemberForm
          member={editingMember}
          onSubmit={
            (editingMember ? updateMember : addMember) as (
              member: Omit<Member, "id">
            ) => void
          }
          onCancel={() => {
            setIsAddingMember(false);
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
}
