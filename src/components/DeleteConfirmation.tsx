
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <TrashIcon className="h-5 w-5" />
            <AlertDialogTitle>حذف المهمة</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            هل أنت متأكد من رغبتك في حذف المهمة "{title}"؟ 
            <br />
            هذا الإجراء لا يمكن التراجع عنه وستفقد جميع بيانات التذكير المرتبطة بها.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            نعم، حذف المهمة
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
