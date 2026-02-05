import { Calendar, Clock, MapPin, Users, User } from 'lucide-react';
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
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1 border border-border/50 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Category Header */}
      <div className={`${categoryColor} px-6 py-3`}>
        <span className="text-sm font-semibold text-primary-foreground uppercase tracking-wide">
          {course.categoria}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
          {course.nome}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {course.descricao}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-accent" />
            <span>{course.horario}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="truncate">{course.local}</span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {course.facilitador && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span className="truncate max-w-[150px]">{course.facilitador}</span>
            </div>
          )}
          {course.vagas && (
            <div className="flex items-center gap-1 text-xs">
              <Users className="w-3 h-3 text-accent" />
              <span className="text-accent font-medium">{course.vagas} vagas</span>
            </div>
          )}
          {course.cargaHoraria && !course.vagas && (
            <span className="text-xs text-muted-foreground">{course.cargaHoraria}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
