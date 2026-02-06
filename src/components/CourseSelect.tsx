import { useMemo, useState } from 'react';
import { Info } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type CourseSelectOption = {
  course_id: string;
  name: string;
  starts_at: string;
  capacity: number;
  remaining: number;
};

type CourseSelectProps = {
  value?: string;
  onValueChange: (value: string) => void;
  options: CourseSelectOption[];
  placeholder?: string;
  disabled?: boolean;
};

const getCourseStatus = (remaining: number) => {
  if (remaining <= 0) return 'sold_out';
  if (remaining <= 3) return 'last_spots';
  return 'available';
};

const formatStartsAt = (startsAt: string) => {
  const date = new Date(startsAt);
  if (Number.isNaN(date.getTime())) return startsAt;
  const dateLabel = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
  const timeLabel = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${dateLabel} · ${timeLabel}`;
};

const ProgressBar = ({ value }: { value: number }) => (
  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
    <div className="h-full rounded-full bg-current transition-[width] duration-500 ease-out" style={{ width: `${value}%` }} />
  </div>
);

export const CourseSelect = ({ value, onValueChange, options, placeholder = 'Selecione um curso', disabled }: CourseSelectProps) => {
  const [open, setOpen] = useState(false);

  const byId = useMemo(() => {
    const map = new Map<string, CourseSelectOption>();
    for (const option of options) map.set(option.course_id, option);
    return map;
  }, [options]);

  const selected = value ? byId.get(value) : undefined;
  const status = selected ? getCourseStatus(selected.remaining) : null;
  const filled = selected ? Math.min(100, Math.max(0, ((selected.capacity - selected.remaining) / Math.max(1, selected.capacity)) * 100)) : 0;

  const triggerTone =
    status === 'sold_out'
      ? 'border-destructive/60 ring-destructive/30 text-destructive'
      : status === 'last_spots'
        ? 'border-amber-500/50 ring-amber-500/30 text-amber-700'
        : 'border-input text-foreground';

  return (
    <Select value={value} onValueChange={onValueChange} open={open} onOpenChange={setOpen} disabled={disabled}>
      <SelectTrigger
        className={cn(
          'relative h-auto items-stretch gap-3 px-4 py-3 pr-12 text-left transition-colors duration-200',
          'hover:border-primary/40',
          'focus-visible:ring-2 focus-visible:ring-ring/40',
          '[&>svg]:absolute [&>svg]:right-4 [&>svg]:top-4 [&>svg]:opacity-60',
          '[&>svg]:transition-transform [&>svg]:duration-200 data-[state=open]:[&>svg]:rotate-180',
          triggerTone,
        )}
        aria-label="Seleção de curso"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {!selected ? (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 text-sm text-muted-foreground">{placeholder}</div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="line-clamp-2 text-sm font-semibold text-foreground">{selected.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatStartsAt(selected.starts_at)}</div>
                </div>

                <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:flex-col sm:items-end sm:justify-start">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            'border-transparent',
                            status === 'sold_out' && 'bg-destructive text-destructive-foreground',
                            status === 'last_spots' && 'bg-amber-500 text-black',
                            status === 'available' && 'bg-emerald-600 text-white',
                          )}
                        >
                          {status === 'sold_out' ? 'Esgotado' : status === 'last_spots' ? 'Últimas vagas' : 'Disponível'}
                        </Badge>
                        <Info className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {status === 'sold_out'
                        ? 'Curso lotado. Escolha outro.'
                        : 'Vagas restantes atualizam automaticamente.'}
                    </TooltipContent>
                  </Tooltip>

                  <div className={cn('text-xs font-medium', status === 'sold_out' ? 'text-destructive' : 'text-muted-foreground')}>
                    {selected.remaining}/{selected.capacity} vagas
                  </div>
                  <span className="sr-only">
                    {status === 'sold_out'
                      ? 'Curso esgotado'
                      : `${selected.remaining} vagas restantes de ${selected.capacity}`}
                  </span>
                </div>
              </div>

              <div className={cn(status === 'sold_out' ? 'text-destructive' : status === 'last_spots' ? 'text-amber-600' : 'text-emerald-600')}>
                <ProgressBar value={filled} />
              </div>
            </>
          )}
        </div>
      </SelectTrigger>

      <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)] p-2">
        {options.map((course) => {
          const itemStatus = getCourseStatus(course.remaining);
          const itemFilled = Math.min(100, Math.max(0, ((course.capacity - course.remaining) / Math.max(1, course.capacity)) * 100));
          const disabledItem = course.remaining <= 0;
          return (
            <SelectItem
              key={course.course_id}
              value={course.course_id}
              disabled={disabledItem}
              className={cn('rounded-lg py-3 pr-3', disabledItem && 'opacity-60')}
            >
              <div className="flex w-full min-w-0 flex-col gap-2">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="line-clamp-2 text-sm font-medium text-foreground">{course.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{formatStartsAt(course.starts_at)}</div>
                  </div>

                  <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:flex-col sm:items-end sm:justify-start">
                    <Badge
                      className={cn(
                        'border-transparent',
                        itemStatus === 'sold_out' && 'bg-destructive text-destructive-foreground',
                        itemStatus === 'last_spots' && 'bg-amber-500 text-black',
                        itemStatus === 'available' && 'bg-emerald-600 text-white',
                      )}
                    >
                      {itemStatus === 'sold_out' ? 'Esgotado' : itemStatus === 'last_spots' ? 'Últimas vagas' : 'Disponível'}
                    </Badge>
                    <div className={cn('text-xs font-medium', itemStatus === 'sold_out' ? 'text-destructive' : 'text-muted-foreground')}>
                      {course.remaining}/{course.capacity}
                    </div>
                  </div>
                </div>

                <div className={cn(itemStatus === 'sold_out' ? 'text-destructive' : itemStatus === 'last_spots' ? 'text-amber-600' : 'text-emerald-600')}>
                  <ProgressBar value={itemFilled} />
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
