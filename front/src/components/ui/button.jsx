import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBan, faCheck, faEye, faPlus } from "@fortawesome/free-solid-svg-icons"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        enable: "bg-green-200 text-green-900 hover:bg-green-400 transition-all duration-150 hover:scale-110 active:scale-95",
        disable: "bg-red-100 text-red-900 hover:bg-red-300 transition-all duration-150 hover:scale-110 active:scale-95",
        view: "bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all duration-150 hover:scale-110 active:scale-95",
        add: "bg-blue-900 text-white hover:bg-blue-800 transition-all duration-150 hover:scale-110 active:scale-95",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconMap = {
  enable: faCheck,
  disable: faBan,
  view: faEye,
  add: faPlus,
};

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const faIcon = !asChild && (icon || iconMap[variant]); // si aucune icone, celle par défaut
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {faIcon && <FontAwesomeIcon icon={faIcon} />}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
