'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Account</h1>
            <p className="text-muted-foreground">Manage your profile and account settings.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                <AvatarFallback className="text-2xl">{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <CardTitle className="text-2xl">{user?.displayName}</CardTitle>
                <CardDescription>View and edit your profile details below.</CardDescription>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">Change Avatar</Button>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input id="displayName" defaultValue={user?.displayName ?? ''} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user?.email ?? ''} disabled />
                        </div>
                         <div className="space-y-2">
                            <Label>Current Plan</Label>
                            <Input defaultValue="Pro Plan" disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full sm:w-auto">Save Changes</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Password & Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full sm:w-auto">Update Password</Button>
                    </CardFooter>
                </Card>
            </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
          <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
              <p className="text-sm text-center sm:text-left">Delete your account and all associated data.</p>
              <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
          </CardContent>
      </Card>
    </div>
  )
}
