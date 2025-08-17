import { PageHeaderProps } from '@/types/ui'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export function PageHeader({ title, description, children, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="pt-2">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
} 