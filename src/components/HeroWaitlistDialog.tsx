"use client";

import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const defaultTriggerClass =
  "w-full rounded-cute bg-emerald-500 px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-emerald-500/20 transition-all duration-500 hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto sm:px-10 sm:py-5 sm:text-lg lg:transform lg:hover:-translate-y-2";

export type HeroWaitlistDialogProps = {
  triggerClassName?: string;
};

export function HeroWaitlistDialog({ triggerClassName }: HeroWaitlistDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={cn(defaultTriggerClass, triggerClassName)}>
          Join Waitlist
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the waitlist</DialogTitle>
          <DialogDescription>
            Early access and launch updates, straight to your inbox.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-3">
          <WaitlistForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
