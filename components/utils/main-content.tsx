import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface MainContent {
    setIsAddingMember: (isAddingMember: boolean) => void;
}

export function MainContent({ setIsAddingMember }: MainContent) {
    return (
        <div className="flex justify-between items-center">
            <div className="pl-2">
                <h2 className="text-3xl font-bold mb-1">Manage your</h2>
                <h2 className="text-3xl font-bold">Fitness business</h2>
                <p className="text-gray-500 text-sm mt-2">6 Aug 2024, 07:20am</p>
            </div>
            <div className="space-x-4 flex items-center">
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
    )
}