import { useMemo } from 'react';
import { courses } from '@/data/courses';
import CourseCard from './CourseCard';
import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CoursesSection = () => {
  const filteredCourses = useMemo(
    () => [...courses].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()),
    [],
  );

  const tabs = useMemo(
    () =>
      filteredCourses.map((course, index) => {
        const labelDate = format(parseISO(course.data), "d MMM", { locale: ptBR });
        const labelStart = course.horario.split(' - ')[0]?.replace(':00', 'h') ?? '';
        return {
          id: course.id,
          label: `${labelDate} · ${labelStart}`,
          content: <CourseCard key={course.id} course={course} index={index} />,
        };
      }),
    [filteredCourses],
  );

  return (
    <section id="cursos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Programação Completa
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Cursos do <span className="text-gradient">Mês da Mulher</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira a programação de <strong className="text-foreground">Empreendedorismo</strong> em Curionópolis.
            </p>
          </div>

          <div className="mb-12 flex justify-center">
            <button
              type="button"
              className="px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 bg-gradient-hero text-primary-foreground shadow-cta scale-105"
            >
              Empreendedorismo
            </button>
          </div>

          <div className="flex justify-center">
            <AnimatedTabs tabs={tabs} className="w-full max-w-5xl" />
          </div>

          {/* Results Count */}
          <div className="text-center mt-8 text-muted-foreground">
            Exibindo <span className="font-semibold text-foreground">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'curso' : 'cursos'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
