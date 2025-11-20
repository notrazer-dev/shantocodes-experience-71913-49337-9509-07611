import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useThemeColor, ThemeColor } from "@/hooks/use-theme-color";

const colorOptions: { name: string; value: ThemeColor; color: string }[] = [
  { name: "Green", value: "green", color: "hsl(120 61% 34%)" },
  { name: "Blue", value: "blue", color: "hsl(210 100% 45%)" },
  { name: "Orange", value: "orange", color: "hsl(30 100% 45%)" },
  { name: "Purple", value: "purple", color: "hsl(270 70% 45%)" },
  { name: "Pink", value: "pink", color: "hsl(330 70% 50%)" },
];

interface SettingsDialogProps {
  variant?: "icon" | "text";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SettingsDialog({ variant = "icon", open, onOpenChange }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useThemeColor();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {variant === "icon" ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl transition-all duration-300 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" strokeWidth={2} />
          </Button>
        ) : (
          <button className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your theme and color preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Mode Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Theme Mode</label>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Theme Color</label>
            <div className="flex gap-3 justify-center">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setThemeColor(option.value)}
                  className={`
                    relative h-10 w-10 rounded-full transition-all duration-300
                    ${themeColor === option.value ? "ring-2 ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"}
                  `}
                  style={{
                    backgroundColor: option.color,
                    boxShadow: themeColor === option.value ? `0 0 20px ${option.color}80` : 'none'
                  }}
                  title={option.name}
                >
                  {themeColor === option.value && (
                    <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
