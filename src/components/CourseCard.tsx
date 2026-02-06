import { Calendar, Clock, MapPin } from 'lucide-react';
import { Course, categoryColors } from '@/data/courses';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const formattedDate = format(parseISO(course.data), "d 'de' MMMM", { locale: ptBR });
  const categoryColor = categoryColors[course.categoria];

  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#4B0082]/90 via-[#5B2C83]/80 to-[#FFE8F0]/70 p-6 shadow-[0_20px_45px_rgba(35,10,69,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(35,10,69,0.35)] focus-within:ring-2 focus-within:ring-[#F7C8D9]/70 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FFD700]/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#F7C8D9]/30 blur-2xl" />
      <div className="pointer-events-none absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-semibold text-white/90">
        ♀
      </div>

      <div className="relative flex flex-wrap items-center gap-2">
        <span className={`${categoryColor} inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground shadow-[0_6px_16px_rgba(0,0,0,0.2)]`}>
          {course.categoria}
        </span>
        {course.vagas && (
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/80">
            {course.vagas} vagas
          </span>
        )}
      </div>

      <h3 className="mt-5 line-clamp-2 font-display text-xl font-semibold tracking-tight text-white drop-shadow-sm transition-colors group-hover:text-[#FFD700]">
        {course.nome}
      </h3>

      {course.descricao && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">
          {course.descricao}
        </p>
      )}

      <div className="mt-4 space-y-2 text-sm text-white/80">
        <div className="flex flex-wrap items-center gap-2">
          <Calendar className="h-4 w-4 text-[#FFD700]" />
          <span>{formattedDate}</span>
          <span className="text-white/40">•</span>
          <Clock className="h-4 w-4 text-[#FFD700]" />
          <span>{course.horario}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FFD700]" />
          <span className="line-clamp-2">{course.local}</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
