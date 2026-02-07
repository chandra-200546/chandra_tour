-- Allow group admins to mark any expense split as paid in their groups
CREATE POLICY "Group admins can update any splits"
ON public.expense_splits
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM expenses e
    JOIN group_members gm ON gm.group_id = e.group_id
    WHERE e.id = expense_splits.expense_id
      AND gm.user_id = auth.uid()
      AND gm.is_admin = true
  )
);
