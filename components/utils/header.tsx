import { Bell, DatabaseZap, User2 } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
    activeNav: string;
    setActiveNav: (activeNav: string) => void;
}

export function Header({ activeNav, setActiveNav }: HeaderProps) {
    return (
        <header className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg">
                    <DatabaseZap className="w-12 h-12" />
                </div>
                <div>
                    <h1 className="font-semibold text-xl">GYM MANAGMENT</h1>
                    <p className="text-sm text-gray-500">Welcome Dear! 👋🏽</p>
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
    )
}