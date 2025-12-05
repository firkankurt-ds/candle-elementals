import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Note: Radix Slot is not installed yet, I'll stick to standard button for now or just generic props
// Actually simpler to just not use Slot for now unless I install @radix-ui/react-slot. 
// I'll stick to standard button to avoid extra deps for now, or just install it.
// Let's implement a clean button without Radix for speed, or just use a standard "Button" interface.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 tracking-wide uppercase",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:scale-105 transition-all duration-300",
                destructive:
                    "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90",
                outline:
                    "border border-primary bg-transparent shadow-sm hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-6 py-2", // Taller for luxury feel
                sm: "h-9 px-3 text-xs",
                lg: "h-14 px-8 text-base",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        // Basic implementation without asChild for now to avoid radix dep if not needed
        const Comp = "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
