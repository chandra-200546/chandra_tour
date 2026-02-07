import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface ExpensesListProps {
  expenses: any[];
  members: any[];
  onRefresh: () => void;
}

const ExpensesList = ({ expenses, members, onRefresh }: ExpensesListProps) => {
  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No expenses yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const payerName = expense.paid_by?.name || "Unknown";
        const payerId = expense.expense_splits?.find((s: any) => s.is_paid)?.member_id;
        const totalAmount = parseFloat(expense.amount);

        // Separate payer's split from others
        const otherSplits = expense.expense_splits?.filter(
          (s: any) => s.member_id !== payerId
        ) || [];
        const payerSplit = expense.expense_splits?.find(
          (s: any) => s.member_id === payerId
        );

        return (
          <Card key={expense.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{expense.description}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(expense.expense_date), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">₹{totalAmount.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs capitalize mt-1">
                    {expense.split_type} split
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Paid by section */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Paid by</p>
                  <p className="font-semibold text-foreground">{payerName}</p>
                </div>
                <p className="text-lg font-bold text-primary">₹{totalAmount.toFixed(2)}</p>
              </div>

              {/* Split among members */}
              {otherSplits.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Owes to {payerName}:
                  </p>
                  <div className="space-y-2">
                    {otherSplits.map((split: any) => {
                      const member = members.find(m => m.id === split.member_id);
                      return (
                        <div
                          key={split.id}
                          className="flex items-center justify-between p-2 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{member?.name}</span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{payerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">₹{parseFloat(split.share_amount).toFixed(2)}</span>
                            {split.is_paid ? (
                              <Badge className="bg-green-600 text-white text-xs hover:bg-green-600">
                                Settled
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Payer's own share info */}
              {payerSplit && (
                <p className="text-xs text-muted-foreground text-center">
                  {payerName}'s own share: ₹{parseFloat(payerSplit.share_amount).toFixed(2)} (self-paid)
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ExpensesList;
