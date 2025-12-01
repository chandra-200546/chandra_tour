import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";
import AddMemberDialog from "./AddMemberDialog";

interface MembersListProps {
  members: any[];
  groupId: string;
  onRefresh: () => void;
}

const MembersList = ({ members, groupId, onRefresh }: MembersListProps) => {
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Group Members ({members.length})
          </CardTitle>
          <Button size="sm" onClick={() => setAddMemberOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    {member.phone_number && (
                      <p className="text-sm text-muted-foreground">{member.phone_number}</p>
                    )}
                  </div>
                </div>
                {member.is_admin && (
                  <Badge variant="secondary">Admin</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddMemberDialog
        open={addMemberOpen}
        onOpenChange={setAddMemberOpen}
        groupId={groupId}
        onSuccess={onRefresh}
      />
    </>
  );
};

export default MembersList;
