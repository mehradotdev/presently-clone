import { ThemeToggle } from '../ThemeToggle';

export function AppearanceSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Appearance</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Customize how Presently looks and feels
        </p>
      </div>
      
      <ThemeToggle />
    </div>
  );
}
