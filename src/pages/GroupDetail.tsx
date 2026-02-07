import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import MembersList from "@/components/smartpay/MembersList";
import ExpensesList from "@/components/smartpay/ExpensesList";
import AddExpenseDialog from "@/components/smartpay/AddExpenseDialog";
import PaymentDashboard from "@/components/smartpay/PaymentDashboard";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchGroupData();
  }, [groupId]);

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      
      // Fetch group details
      const { data: groupData, error: groupError } = await supabase
        .from("trip_groups")
        .select("*")
        .eq("id", groupId)
        .single();

      if (groupError) throw groupError;
      setGroup(groupData);

      // Fetch members
      const { data: membersData, error: membersError } = await supabase
        .from("group_members")
        .select("*")
        .eq("group_id", groupId);

      if (membersError) throw membersError;
      setMembers(membersData || []);

      // Check if current user is admin
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const currentMember = (membersData || []).find(
          (m: any) => m.user_id === session.user.id
        );
        setIsAdmin(currentMember?.is_admin || false);
      }

      // Fetch expenses
      const { data: expensesData, error: expensesError } = await supabase
        .from("expenses")
        .select(`
          *,
          paid_by:group_members!expenses_paid_by_fkey(name),
          expense_splits(*)
        `)
        .eq("group_id", groupId)
        .order("expense_date", { ascending: false });

      if (expensesError) throw expensesError;
      setExpenses(expensesData || []);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <p className="text-center text-muted-foreground">Group not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/smartpay")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Groups
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{group.name}</h1>
              <p className="text-muted-foreground">{group.description || "No description"}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Trip Code: <span className="font-mono font-bold">{group.trip_code}</span>
              </p>
            </div>
            <Button onClick={() => setAddExpenseOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </div>

          <Tabs defaultValue="expenses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="expenses">
              <ExpensesList expenses={expenses} members={members} onRefresh={fetchGroupData} isAdmin={isAdmin} />
            </TabsContent>

            <TabsContent value="members">
              <MembersList members={members} groupId={groupId!} onRefresh={fetchGroupData} />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentDashboard expenses={expenses} members={members} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddExpenseDialog
        open={addExpenseOpen}
        onOpenChange={setAddExpenseOpen}
        groupId={groupId!}
        members={members}
        onSuccess={fetchGroupData}
      />
    </div>
  );
};

export default GroupDetail;
