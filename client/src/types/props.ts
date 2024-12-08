import { Bus } from './bus';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export interface BusDialogProps extends DialogProps {
  bus: Bus;
}