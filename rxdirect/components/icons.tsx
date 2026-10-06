import {
  ChefHat,
  Car,
  Users,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Baby,
  Trees,
  Stethoscope,
  HeartHandshake,
  UsersRound,
  Zap,
  Wrench,
  Hammer,
  PaintRoller,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/services";

export const serviceIconMap: Record<IconName, LucideIcon> = {
  chef: ChefHat,
  driver: Car,
  helper: Users,
  cleaner: Sparkles,
  guard: ShieldCheck,
  officeBoy: Briefcase,
  nanny: Baby,
  gardener: Trees,
  nurse: Stethoscope,
  caretaker: HeartHandshake,
  electrician: Zap,
  plumber: Wrench,
  carpenter: Hammer,
  painter: PaintRoller,
  couple: UsersRound,
  batman: UserCog,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Icon = serviceIconMap[name];
  return <Icon className={className} aria-hidden="true" />;
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4v14.5H.5V8.5Zm7.5 0h3.84v1.98h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.81 2.67 4.81 6.15v8.43h-4v-7.47c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.94v7.6h-4V8.5Z" transform="translate(2 0)" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4L15.82 12 9.6 15.6Z" />
    </svg>
  );
}

export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 2h-3.2v13.3a3.1 3.1 0 1 1-2.2-2.97v-3.28a6.34 6.34 0 1 0 5.4 6.28V9.02a7.63 7.63 0 0 0 4.4 1.4V7.2a4.42 4.42 0 0 1-4.4-4.42V2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.617 4.63 1.789 6.637L2.667 29.333l6.86-1.797a13.27 13.27 0 0 0 6.477 1.65h.006c7.363 0 13.333-5.97 13.333-13.333S23.367 2.667 16.004 2.667Zm0 24.4h-.005a11.03 11.03 0 0 1-5.62-1.54l-.403-.24-4.072 1.067 1.087-3.97-.263-.407a11.03 11.03 0 0 1-1.693-5.877c0-6.106 4.966-11.073 11.074-11.073 2.957 0 5.737 1.153 7.827 3.246a10.996 10.996 0 0 1 3.244 7.83c0 6.107-4.966 11.074-11.076 11.074Zm6.073-8.294c-.333-.167-1.966-.97-2.271-1.081-.305-.111-.527-.167-.75.167-.222.333-.86 1.081-1.054 1.303-.194.222-.389.25-.722.083-.333-.167-1.406-.518-2.678-1.652-.99-.883-1.659-1.974-1.853-2.307-.194-.333-.021-.513.146-.679.15-.149.333-.389.5-.583.167-.194.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.806-1.028-2.474-.271-.65-.546-.563-.75-.573l-.639-.011c-.222 0-.583.083-.888.417-.305.333-1.166 1.14-1.166 2.778 0 1.639 1.194 3.222 1.361 3.444.167.222 2.352 3.593 5.699 5.038.796.344 1.417.55 1.901.703.799.254 1.526.218 2.101.132.641-.096 1.966-.804 2.243-1.581.278-.777.278-1.443.194-1.582-.083-.14-.305-.222-.639-.389Z" />
    </svg>
  );
}
