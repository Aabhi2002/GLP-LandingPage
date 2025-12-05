import { cn } from "@/lib/utils";

interface Brand360Props {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "default" | "gradient" | "glow";
}

export const Brand360 = ({ className, size = "md", variant = "gradient" }: Brand360Props) => {
    const sizeClasses = {
        sm: "text-base",
        md: "text-xl",
        lg: "text-2xl",
        xl: "text-4xl"
    };

    const variantClasses = {
        default: "text-secondary font-extrabold",
        gradient: "bg-gradient-to-r from-secondary via-green-400 to-green-500 bg-clip-text text-transparent font-extrabold",
        glow: "text-secondary font-extrabold drop-shadow-[0_0_10px_rgba(139,195,74,0.5)]"
    };

    return (
        <span className={cn("inline-flex items-baseline", className)}>
            <span className={cn(sizeClasses[size], variantClasses[variant])}>
                360
            </span>
            <sup className={cn(
                "align-super ml-0.5",
                size === "sm" && "text-[0.6em]",
                size === "md" && "text-[0.65em]",
                size === "lg" && "text-[0.65em]",
                size === "xl" && "text-[0.65em]",
                variant === "gradient" ? "text-secondary" : variantClasses[variant]
            )}>
                ™
            </sup>
        </span>
    );
};
