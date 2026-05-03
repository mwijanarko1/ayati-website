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
  "rounded-cute border-2 border-mint bg-white px-7 py-4 text-center text-base font-bold text-[#2D5A43] transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 sm:px-10 sm:py-5 sm:text-lg lg:transform lg:hover:-translate-y-2";

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
        <div className="mt-4">
          <WaitlistForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
