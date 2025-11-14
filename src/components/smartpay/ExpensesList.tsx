import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";
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
      {expenses.map((expense) => (
        <Card key={expense.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{expense.description}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Paid by {expense.paid_by?.name} on {format(new Date(expense.expense_date), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{parseFloat(expense.amount).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground capitalize">{expense.split_type} split</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm font-medium">Split Details:</p>
              {expense.expense_splits?.map((split: any) => {
                const member = members.find(m => m.id === split.member_id);
                return (
                  <div key={split.id} className="flex items-center justify-between text-sm">
                    <span>{member?.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">₹{parseFloat(split.share_amount).toFixed(2)}</span>
                      {split.is_paid ? (
                        <span className="text-green-600">✓ Paid</span>
                      ) : (
                        <span className="text-amber-600">⏳ Pending</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExpensesList;
