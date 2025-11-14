import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { QrCode } from "lucide-react";

interface JoinGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const JoinGroupDialog = ({ open, onOpenChange, onSuccess }: JoinGroupDialogProps) => {
  const [tripCode, setTripCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleJoinByCode = async () => {
    if (!tripCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a trip code",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Find group by code
      const { data: group, error: groupError } = await supabase
        .from("trip_groups")
        .select("*")
        .eq("trip_code", tripCode.toUpperCase())
        .single();

      if (groupError) throw new Error("Invalid trip code");

      // Check if already a member
      const { data: existing } = await supabase
        .from("group_members")
        .select("*")
        .eq("group_id", group.id)
        .eq("user_id", user.id)
        .single();

      if (existing) {
        toast({
          title: "Already a member",
          description: "You are already part of this group",
        });
        onOpenChange(false);
        return;
      }

      // Join group
      const { error: memberError } = await supabase
        .from("group_members")
        .insert({
          group_id: group.id,
          user_id: user.id,
          name: user.email || "User",
          is_admin: false,
        });

      if (memberError) throw memberError;

      toast({
        title: "Success",
        description: `Joined ${group.name}!`,
      });

      setTripCode("");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinByPhone = async () => {
    toast({
      title: "Coming Soon",
      description: "Join by phone number feature is under development",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Trip Group</DialogTitle>
          <DialogDescription>
            Join an existing group using trip code or phone number
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Trip Code</TabsTrigger>
            <TabsTrigger value="phone">Phone Number</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code" className="space-y-4">
            <div>
              <Label htmlFor="tripCode">Trip Code</Label>
              <Input
                id="tripCode"
                placeholder="ABC123"
                value={tripCode}
                onChange={(e) => setTripCode(e.target.value.toUpperCase())}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the 6-character code shared by group admin
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleJoinByCode} disabled={loading}>
                {loading ? "Joining..." : "Join Group"}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="phone" className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="memberName">Your Name</Label>
              <Input
                id="memberName"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleJoinByPhone} disabled={loading}>
                Join Group
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;
