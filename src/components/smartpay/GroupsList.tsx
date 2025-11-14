import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface GroupsListProps {
  groups: any[];
  onRefresh: () => void;
}

const GroupsList = ({ groups, onRefresh }: GroupsListProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <Card 
          key={group.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/smartpay/${group.id}`)}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.description || "No description"}</CardDescription>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{group.group_members?.length || 0} members</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(group.created_at), "MMM dd")}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Trip Code: <span className="font-mono font-bold">{group.trip_code}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupsList;
