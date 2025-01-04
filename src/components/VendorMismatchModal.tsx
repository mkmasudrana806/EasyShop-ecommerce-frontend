// Modal Component (assuming ShadCN modal exists)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { FC } from "react";
import { Button } from "./ui/button";

interface VendorMismatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: "replace" | "retain") => void;
}

const VendorMismatchModal: FC<VendorMismatchModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vendor Mismatch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            You are about to add a product from a different vendor. What would
            you like to do?
          </p>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => onConfirm("replace")}>
            Replace Cart
          </Button>
          <Button onClick={() => onConfirm("retain")}>Retain Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VendorMismatchModal;
