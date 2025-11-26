import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Users, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {

    const stats = [
        {title: "Total Posts", value: "3", icon: <Newspaper className="h-6 w-6 text-muted-foreground" />},
        {title: "Total Users", value: "120", icon: <Users className="h-6 w-6 text-muted-foreground" />},
        {title: "Donations This Month", value: "$4,520", icon: <BarChart3 className="h-6 w-6 text-muted-foreground" />},
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map(stat => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Quickly jump to common tasks.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     <Link href="/admin/blog/new" className="block p-4 border rounded-lg hover:bg-secondary">
                        <h3 className="font-semibold">Create New Blog Post</h3>
                        <p className="text-sm text-muted-foreground">Write and publish a new article.</p>
                    </Link>
                     <Link href="/admin/blog" className="block p-4 border rounded-lg hover:bg-secondary">
                        <h3 className="font-semibold">Manage Blog Posts</h3>
                        <p className="text-sm text-muted-foreground">Edit, view, or delete existing posts.</p>
                    </Link>
                     <Link href="#" className="block p-4 border rounded-lg hover:bg-secondary">
                        <h3 className="font-semibold">View Donations</h3>
                        <p className="text-sm text-muted-foreground">See recent donation records.</p>
                    </Link>
                </CardContent>
            </Card>

        </div>
    )
}
