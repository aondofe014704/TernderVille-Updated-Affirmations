import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Account and site settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
          <CardDescription>Settings panel will include password change, profile updates, and site preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            For now, change passwords or admin emails directly in the database, or use the seed-admin script with new credentials.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
