import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Mail, Calendar, LogIn, Lock, MoreHorizontal } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

const AdminDashboard = () => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-dashboard", {
        body: { password },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setUsers(data.users);
      setTotal(data.total);
      setShowPasswordDialog(false);
      setShowDashboard(true);
      setPassword("");
    } catch (err: any) {
      toast({
        title: "Access Denied",
        description: err.message || "Invalid password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowPasswordDialog(true)}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors text-muted-foreground"
        aria-label="Admin access"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Admin Access
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-warm" disabled={loading}>
              {loading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dashboard Dialog */}
      <Dialog open={showDashboard} onOpenChange={setShowDashboard}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Users className="w-6 h-6 text-primary" />
              Admin Dashboard
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Stats */}
            <Card className="border-primary/20">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{total}</p>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registered Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {users.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No users found</p>
                ) : (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.email}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </span>
                          {user.last_sign_in_at && (
                            <span className="flex items-center gap-1">
                              <LogIn className="w-3 h-3" />
                              Last login: {new Date(user.last_sign_in_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
